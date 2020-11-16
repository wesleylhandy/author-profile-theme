const propertiesByType = {
  alternateLocale: {
    'og:locale:alternate': null,
  },
  facebook: {
    'og:url': null,
    'og:title': null,
    'og:description': null,
    'og:type': null,
    'og:determiner': null,
    'og:locale': null,
    'og:locale:alternate': [],
    'og:site_name': null,
  },
  twitter: {
    'twitter:description': null,
    'twitter:title': null,
    'twitter:creator': null,
    'twitter:image': null,
    'twitter:image:secure_url': null,
    'twitter:image:alt': null,
    'twitter:card': null,
  },
  image: {
    'og:image:url': null,
    'og:image:secure_url': null,
    'og:image:type': null,
    'og:image:width': null,
    'og:image:height': null,
    'og:image:alt': null,
  },
  video: {
    'og:video:url': null,
    'og:video:secure_url': null,
    'og:video:type': null,
    'og:video:width': null,
    'og:video:height': null,
  },
  audio: {
    'og:audio:url': null,
    'og:audio:secure_url': null,
    'og:audio:type': null,
  },
  article: {
    'article:published_time': null,
    'article:modified_time': null,
    'article:expiration_time': null,
    'article:author': [],
    'article:section': null,
    'article:tag': [],
    profiles: [],
  },
  book: {
    'book:author': [],
    'book:isbn': null,
    'book:release_date': null,
    'book:tag': [],
    profiles: [],
  },
  profile: {
    'profile:first_name': null,
    'profile:last_name': null,
    'profile:username': null,
    'profile:gender': null,
  },
  'music.song': {
    'music:duration': null,
    'music:album': null,
    'music:album:disc': null,
    'music:album:track': null,
    'music:musician': [],
    profiles: [],
  },
  'music.album': {
    'music:song': [],
    'music:release_date': null,
  },
  'music.playlist': {
    'music:song': [],
    'music:creator': null,
  },
  'music.radio_station': {
    'music:creator': null,
  },
  'video.movie': {
    'video.actor': [],
    'video.actor.role': null,
    'video.director': [],
    'video.writer': [],
    'video.duration': null,
    'video.release_date': null,
    'video.tag': [],
  },
  'video.episode': {
    'video.actor': [],
    'video.actor.role': null,
    'video.director': [],
    'video.writer': [],
    'video.duration': null,
    'video.release_date': null,
    'video.series': null,
  },
  'video.tv_show': {
    'video.actor': [],
    'video.actor.role': null,
    'video.director': [],
    'video.writer': [],
    'video.duration': null,
    'video.release_date': null,
    'video.tag': [],
    profiles: [],
  },
  'video.other': {
    'video.actor': [],
    'video.actor.role': null,
    'video.director': [],
    'video.writer': [],
    'video.duration': null,
    'video.release_date': null,
    'video.tag': [],
    profiles: [],
  },
}

class MetaType {
  constructor(type) {
    this.properties = { ...propertiesByType[type] }
  }
  async updateProperty(property, value) {
    if (!this.properties.includes(property)) {
      return false
    }
    this.properties[property] = value
  }
  setProperties(properties) {
    properties.forEach(({ property, value }) => (this.properties[property] = value))
  }
  getProperties() {
    return Object.keys(this.properties).reduce((properties, property) => {
      if (!this.properties[property]) {
        return properties
      }
      if (Array.isArray(this.properties[property])) {
        if (typeof this.properties[property][0] == `string`) {
            return [...properties, { property, content: this.properties[property].join(",")}]
        }
        const nestedProperties = this.properties[property].map((el) => el && el.getProperties && el.getProperties()).flat()
        return [...properties, ...nestedProperties]
      }
      if (typeof this.properties[property] === MetaType) {
        return [...properties, ...this.properties[property].getProperties()]
      }
      return [...properties, { property, content: this.properties[property] }]
    }, [])
  }
  getNameAttributes() {
    return Object.keys(this.properties).reduce((names, name) => {
      return this.properties[name] ? [...names, { name, content: this.properties[name] }] : names
    }, [])
  }
  addTag(tag) {
    const keys = Object.keys(this.properties)
    const idx = keys.findIndex((property) => property.includes('tag'))
    if (idx > -1 && typeof tag === `string`) {
      this.properties[keys[idx]].push(tag)
    }
  }
  addProfile({ type, profile: { first_name, last_name, username, gender } }) {
    const validProfileTypes = [`author`, `actor`, `director`, `writer`, `musician`, `creator`]
    if (!validProfileTypes.includes(type)) {
      return
    }
    const keys = Object.keys(this.properties)
    const idx = keys.findIndex((property) => property.includes(type))
    if (idx === -1) {
      return
    }
    const profileType = new ProfileType(first_name, last_name, username, gender)
    if (Array.isArray(this.properties[keys[idx]])) {
      this.properties[keys[idx]] = [...this.properties[keys[idx]], username]
    } else {
      this.properties[keys[idx]] = username
    }
    this.properties.profiles = [...this.properties.profiles, profileType]
  }
}

export class ArticleType extends MetaType {
  constructor() {
    super(`article`)
  }
}

export class ProfileType extends MetaType {
  constructor(first_name, last_name, username, gender, role, type) {
    super(`profile`)
    this.properties[`profile:first_name`] = first_name
    this.properties[`profile:last_name`] = last_name
    this.properties[`profile:username`] = username
    this.properties[`profile:gender`] = gender
    if (type === `actor`) {
      this.properties[`video:actor:role`] = role
    }
  }
}

export class FacebookType extends MetaType {
  constructor(data) {
    super(`facebook`)
    this.properties['og:url'] = data.url
    this.properties['og:title'] = data.title
    this.properties['og:description'] = data.description
    this.properties['og:type'] = data.type
    this.properties['og:locale'] = data.locale
    this.properties['og:locale:alternate'] =
      data.alternateLocales &&
      data.alternateLocales.map((locale) => new AlternateLocaleType(locale))
    this.properties['og:site_name'] = data.site_name
  }
}

class AlternateLocaleType extends MetaType {
  constructor(locale) {
    super(`alternateLocale`)
    this.properties['og:locale:alternate'] = locale
  }
}

export class TwitterType extends MetaType {
  constructor(data) {
    super(`twitter`)
    this.properties['twitter:title'] = data.title
    this.properties['twitter:description'] = data.description
    this.properties['twitter:creator'] = data.creator
    this.properties['twitter:image'] = data.image
    this.properties['twitter:image:alt'] = data.image_alt
    this.properties['twitter:image:secure_url'] = data.image_secure_url
  }
}

export class BookType extends MetaType {
  constructor() {
    super(`book`)
  }
}

export class MusicType extends MetaType {
  constructor(subtype, data) {
    super(`music.${subtype}`)
    if (subtype === `song`) {
      this.properties[`music:song`] = data.song
      this.properties[`music:song:disc`] = data.disc
      this.properties[`music:song:track`] = data.track
      this.properties[`music.musician`] = data.musicians.map((musician) => musician.name)
      this.properties[`music.release_date`] = data.release_date
      this.properties.profiles = data.musicians.map((musician) =>
        this.addProfile({ type: `musician`, ...musician })
      )
    }
  }
  addSong({ song }) {
    const keys = Object.keys(this.properties)
    const idx = keys.findIndex((property) => property.includes(`song`))
    if (idx === -1) {
      return
    }
    const songType = new MusicType(`song`, song)
    if (Array.isArray(this.properties[keys[idx]])) {
      this.properties[keys[idx]].push(songType)
    }
  }
}

export class VideoType extends MetaType {
  constructor(subtype, data) {
    super(`video.${subtype}`)
    if (subtype === `episode` && data) {
      this.properties['video.actor'] = data.actors.map((actor) => actor.name)
      this.properties['video.director'] = data.directors.map((director) => director.name)
      this.properties['video.writer'] = data.writers.map((writer) => writer.name)
      this.properties['video.duration'] = data.duration
      this.properties['video.release_date'] = data.releaseDate
      this.properties['video.series'] = new VideoType(`series`, ...data.series)
      this.properties.profiles = [
        ...data.actors.map((actor) => this.addProfile({ type: `actor`, ...actor })),
        ...data.directors.map((director) => this.addProfile({ type: `director`, ...director })),
        ...data.writers.map((writer) => this.addProfile({ type: `writer`, ...writer })),
      ]
    }
  }
}

export class OGImageType extends MetaType {
  constructor(url, secure_url, type, width, height, alt) {
    super(`image`)
    this.properties['og:image:url'] = url
    this.properties['og:image:secure_url'] = secure_url
    this.properties['og:image:type'] = type
    this.properties['og:image:width'] = width
    this.properties['og:image:height'] = height
    this.properties['og:image:alt'] = alt
  }
}

export class OGVideoType extends MetaType {
  constructor(url, secure_url, type, width, height) {
    super(`video`)
    this.properties['og:video:url'] = url
    this.properties['og:video:secure_url'] = secure_url
    this.properties['og:video:type'] = type
    this.properties['og:video:width'] = width
    this.properties['og:video:height'] = height
  }
}

export class OGAudioType extends MetaType {
  constructor(url, secure_url, type) {
    super(`audio`)
    this.properties['og:audio:url'] = url
    this.properties['og:audio:secure_url'] = secure_url
    this.properties['og:audio:type'] = type
  }
}

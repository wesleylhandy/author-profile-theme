import React from 'react';
import Layout from 'gatsby-theme-author-base/src/components/layout';
import PostPreview from 'gatsby-theme-author-base/src/components/post-preview';
import Pagination from 'gatsby-theme-author-base/src/components/pagination';

const PostPreviewsTemplate = ({ pageContext }) => {
  const posts = pageContext.group.map(p => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    path: p.slug,
  }));

  return (
    <Layout>
      <h2>Recent Posts</h2>
      {posts.map(post => (
        <PostPreview key={post.id} post={post} />
      ))}
      <Pagination
        isFirstPage={pageContext.isFirstPage}
        isLastPage={pageContext.isLastPage}
        currentPage={pageContext.currentPage}
        totalPages={pageContext.totalPages}
        linkBase={pageContext.linkBase}
      />
    </Layout>
  );
};

export default PostPreviewsTemplate;
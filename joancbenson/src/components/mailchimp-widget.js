/** @jsx jsx */
import { Fragment, useState, useRef } from "react";
import PropTypes from "prop-types"
import { jsx, Button, Input } from 'theme-ui'
import addToMailchimp from 'gatsby-plugin-mailchimp'


const MailchimpWidget = ({heading = "Subscribe To My Newsletter", hide = false}) => {
    const { isFetching, setFetching } = useState(false);
    const { hasFetched, setHasFetched } = useState(false);
    const badger = useRef();
    const emailAddress = useRef();
    const handleSubmit = async e => {
        e.preventDefault();
        if (badger.current.value) {
            console.info("bot bot bot");
            alert("There was an issue submitting your form. Please try again");
        }
        const result = await addToMailchimp(emailAddress.current.value);
        console.log(result);
        setFetching(false);
        setHasFetched(true);
    }
    return !hide ? (
            <article
            className="mailchimp-widget"
            sx={{ padding: 3, border: `5px solid`, borderColor: `primary`, mx: `auto`, my: 3 }}
            >
                <h2>{heading}</h2>
                { hasFetched ? (
                    <Fragment>
                        <h3 sx={{margin: '30px auto'}}>THank you!</h3>
                        <p>You should start receiving emails from me whenever I publish new blog posts or compose a new newsletter. Please check your spam filters if you don't receive something for over a week.</p>
                    </Fragment>
                ) : (
                    <form onSubmit={handleSubmit} autoComplete>
                        <label htmlFor="emailAddress">Your Email</label>
                        <Input
                            disabled={isFetching}
                            type="email"
                            name="emailAddress"
                            id="emailAddress"
                            placeholder="you@example.com"
                            ref={emailAddress}
                            required={true}
                            title="Please provide a valid email address"
                        />
                        <input name="mailchimp-badger" type="text" sx={{ display: "none" }} ref={badger} />
                        <Button 
                            disabled={isFetching}
                            variant="buttons.tertiary"
                            sx={{ display: `block`, mx: `auto`, maxWidth: 300, width: `100%`, my: 3 }}
                            type="submit">
                                Subscribe
                        </Button>
                    </form>
                )}
            </article>
        ) : null
}

MailchimpWidget.propTypes = {
    heading: PropTypes.string,
    hide: PropTypes.bool
  }

export default MailchimpWidget
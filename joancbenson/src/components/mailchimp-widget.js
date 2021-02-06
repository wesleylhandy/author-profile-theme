/** @jsx jsx */
import { Fragment, useState } from "react";
import PropTypes from "prop-types"
import { jsx, Button, Input } from 'theme-ui'
import addToMailchimp from 'gatsby-plugin-mailchimp'


const MailchimpWidget = ({heading = "Subscribe To My Newsletter", hide = false}) => {
    const { isFetching, setFetching } = useState(false);
    const { hasFetched, setHasFetched } = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const badger = e.target.badger.value;
        if (badger) {
            console.info("bot bot bot");
            alert("There was an issue submitting your form. Please try again");
        }
        const result = await addToMailchimp(email);
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
                        <label htmlFor="email">Your Email</label>
                        <Input
                            disabled={isFetching}
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required={true}
                            title="Please provide a valid email address"
                        />
                        <input name="mailchimp-badger" type="text" sx={{ display: "none" }} />
                        <Button 
                            disabled={isFetching}
                            variant="buttons.tertiary"
                            sx={{ display: `block`, mx: `auto`, maxWidth: 300, width: `100%` }}
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
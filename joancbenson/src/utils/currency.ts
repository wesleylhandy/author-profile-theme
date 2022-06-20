export const convertToCurrency = (amount = 0.00) => {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(amount);
}
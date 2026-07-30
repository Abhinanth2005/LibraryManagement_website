import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    "pk_test_51TyYZkA9C4a3CLEu5kUNB5TNofSVDohZvrOYDd1OzYcHHiHOsT4lpfOAwTzuf91FZfzYggz8QcC0JgHVQgiPsnI700YxSFoXiv"
);
import 'dotenv/config';
import Stripe from 'stripe';
import { version } from '../../package.json';

// const key = 'sk_test_51LOunFKbaj0BGkLzDYj3biZ8Zu94Wn7539jtwXYWKORyU7FHigJKLixHtlKKAh9dsc2Ysz3qoWFtSsiM7HSmm1Fz000yq2PeE6'

export const stripe = new Stripe(
    //key,
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version,
        },
    }
);

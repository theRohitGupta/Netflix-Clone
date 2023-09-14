import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import Spinner from './Spinner';

function Plans() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role : subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid]);


    useEffect(() => {
        db.collection('products')
        .where('active','==', true)
        .get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                // console.log(priceSnap);
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });
    }, []);

    // console.log(products);
    // console.log(subscription);

    const loadCheckout = async (priceId) => {
        setLoading(true);
        const docRef = await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        
        docRef.onSnapshot((async(snap) => {
            const { error, sessionId } = snap.data();
            if(error){
                // SHOW AN ERROR TO CUSTOMER
                alert(`An Error Occured: ${error.message}`);
            }
            if(sessionId){
                // WE HAVE A SESSION, let's Redirect to checkout
                // init stripe
                const stripe = await loadStripe('pk_test_51Nld4FSDpET5LPRNv6nQx2SrnI7se5WoiY2IIiQsdl3YCKRQyQB3cRtcNmsEvAZbNRR5NvUd1adWKwzP6R7AEMgX00kSb8crUZ');
                stripe.redirectToCheckout({ sessionId })
            }
        }))
        setLoading(false);
    };

  return (
    <>
        {
            loading ? (<div className='flex items-center justify-center h-full'><Spinner/></div>) :
            (
                <div>
                    {subscription && <p>Expiration Date: {new Date(subscription?.current_period_end * 1000.1).toLocaleDateString()}</p>}
                    {
                        Object.entries(products).map(([product, productData]) => {
                            // ADD SOME LOGIC TO CHECK IF THE USERS SUBSCRIPTION IS ACTIVE
                            const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                            return (
                                <div key={productData.id} className={`${isCurrentPackage && "plans_screen_disabled"} plan_screen_plan`}>
                                    <div>
                                        <h5 className='font-semibold text-[1rem] sm:text-[1.2rem]'>{productData.name}</h5>
                                        <h6 className='text-xs sm:text-base'>{productData.description}</h6>
                                    </div>
                                    <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                                    className='px-2 py-1 text-[0.8rem] sm:px-5 sm:py-2 sm:text-[1rem] text-white bg-[#e50914] font-semibold border-none'>
                                        {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    </>
  )
}

export default Plans
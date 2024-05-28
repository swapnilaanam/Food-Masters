const FAQS = () => {
    const showAnswer = (clsName) => {
        console.log(clsName);
        const element = document.querySelector(`.${clsName}`);

        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden')
            element.parentElement.style.height = '180px'
        } else {
            element.classList.add('hidden');
            element.parentElement.style.height = '110px'
        }
    }

    return (
        <section className="pt-16 pb-28 px-4">
            <h2 className="text-4xl text-center font-medium">
                Frequently Asked Questions
            </h2>
            <p className="mt-5 text-center text-xl text-gray-500 font-light tracking-wider">
                Get answers to the most common questions about our service.
            </p>
            <div className="mt-24 max-w-7xl mx-auto flex flex-col gap-14">
                <div className="flex flex-col lg:flex-row justify-center lg:items-start gap-14">
                    <div
                        onClick={() => showAnswer('faq-1')}
                        className="flex-1 bg-orange-100 px-7 py-7 rounded border-2 border-orange-50 hover:cursor-pointer flex flex-col justify-start"
                        data-aos="zoom"
                        data-aos-offset="200"
                        data-aos-duration="1500"
                        style={{ height: '110px', transition: '0.7s' }}>
                        <h4 className="text-xl font-medium">
                            Can we order food from two different restaurant in a single order?
                        </h4>
                        <p className="mt-5 text-gray-600 hidden faq-1">
                            No, you can not. You have to place separate order for foods from different restaurant.
                        </p>
                    </div>
                    <div
                        onClick={() => showAnswer('faq-2')}
                        className="flex-1 bg-orange-100 px-7 py-7 rounded border-2 border-orange-50 hover:cursor-pointer flex flex-col justify-start"
                        data-aos="zoom"
                        data-aos-offset="200"
                        data-aos-duration="1500"
                        style={{ height: '110px', transition: '0.7s' }}>
                        <h4 className="text-xl font-medium">
                            What is the estimated delivery time?
                        </h4>
                        <p className="mt-5 text-gray-600 hidden faq-2">
                            Delivery typically takes 30-60 minutes, varying with location and demand.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center lg:items-start gap-14">
                    <div
                        onClick={() => showAnswer('faq-3')}
                        className="flex-1 bg-orange-100 px-7 py-7 rounded border-2 border-orange-50 hover:cursor-pointer flex flex-col justify-start"
                        data-aos="zoom"
                        data-aos-offset="200"
                        data-aos-duration="1500"
                        style={{ height: '110px', transition: '0.7s' }}
                    >
                        <h4 className="text-xl font-medium">
                            Can I track my order?
                        </h4>
                        <p className="mt-5 text-gray-600 hidden faq-3">
                            Yes, you can track your order using order page. From order page you can see the delivery timeline for each of your order.
                        </p>
                    </div>
                    <div
                        onClick={() => showAnswer('faq-4')}
                        className="flex-1 bg-orange-100 px-7 py-7 rounded border-2 border-orange-50 hover:cursor-pointer flex flex-col justify-start"
                        data-aos="zoom"
                        data-aos-offset="200"
                        data-aos-duration="1500"
                        style={{ height: '110px', transition: '0.7s' }}>
                        <h4 className="text-xl font-medium">
                            Does the vouchers have a minimum order limit?
                        </h4>
                        <p className="mt-5 text-gray-600 hidden faq-4">
                            Yes, the vouchers have minimum order limit depending on the restaurant and their discount percentage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQS
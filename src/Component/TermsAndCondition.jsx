import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 py-[100px]">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Terms and Conditions
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trial, Exchange and Refund Policy:
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              Every customer must be encouraged to check the product before
              payment to the delivery agent.
            </li>
            <li>
              If there are sizing issues or defects, or if the customer does
              not want to take the product, they must be encouraged to return
              on spot to the delivery agent.
            </li>
            <li>
              If a customer takes delivery and identifies sizing issues or
              defects afterwards, they must contact La Vogos within 48 hours of
              delivery. Upon consideration by La Vogos, we will inform the
              customer about the action applicable for their case.
            </li>
            <li>
              Refunds are only applicable if a customer receives a defective
              product and La Vogos cannot replace it with a fresh piece of the
              same product. In all other cases of exchanges and returns,
              customers will be provided alternative products of the same value
              OR an equal amount of store credit for future purchases.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Timing:</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Inside Dhaka: 1-2 days</li>
            <li>Outside Dhaka: 4-5 days</li>
            <li>
              <strong>Urgent Deliveries:</strong> If there is an urgency, we can
              send the product via parcel services (e.g Pathao Parcel) for which
              the product’s amount needs to be paid in advance via Bkash or Nagad
              and the delivery charge can be paid as cash on delivery to the rider
              depending on the customer’s location from La Vogos office. The
              delivery charge will depend on the charge shown in the app of the
              parcel service. The exact delivery time cannot be specified as they
              are handled by a 3rd party delivery company.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Challan = ({ challanData }) => {
  const componentRef = useRef();
  const {
    receiptNo = "001",
    date = new Date().toISOString().slice(0, 10),
    regNo = "---",
    applicationId,
    // course = "---",
    // studentName = "---",

    batchUnit = "---",
    // fatherName = "---",
    // contactNumber = "---",
    // city = "---",
    // address = "---",
    paymentMethod = "Cash",
    // transactionNo = "---",
    bankName = "Habib Bank Limited (HBL)",
    particulars ,
    amountReceived = 0,
  } = challanData || {};
 const {chooseCourse  , name , fatherName , whatsappNumber , district , tehsil } = applicationId;

  // Calculate totals
  const subtotal = particulars.reduce((sum, item) => sum + (item.amount || 0), 0);
  const discount = particulars.find((p) => p.label.includes("Discount"))?.amount || 0;
  const totalAmount = subtotal - Math.abs(discount);
  const remainingBalance = totalAmount - amountReceived;

  // Convert amount to words
  const amountToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const convertHundreds = (n) => {
      let result = "";
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)];
        if (n % 10 > 0) result += " " + ones[n % 10];
      } else if (n >= 10) {
        result += teens[n - 10];
      } else if (n > 0) {
        result += ones[n];
      }
      return result;
    };

    if (num === 0) return "Zero";
    let result = "";
    if (num >= 100000) {
      result += convertHundreds(Math.floor(num / 100000)) + " Lac ";
      num %= 100000;
    }
    if (num >= 1000) {
      result += convertHundreds(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }
    if (num > 0) {
      result += convertHundreds(num);
    }
    return result.trim() + " Only";
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Challan-${receiptNo}`,
  });

  return (
    <>
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded my-3"
      >
        🖨️ Print Challan
      </button>

      <div ref={componentRef} className="p-6 mx-auto max-w-3xl bg-white" style={{ fontSize: "12px" }}>
        {/* Header */}
        <div className="text-center mb-4 pb-2 border-b-2 border-gray-800">
          <div className="flex justify-between mb-2">
            <span className="text-xs">Receipt No: {receiptNo}</span>
            <span className="text-xs font-bold">JKD PAKISTAN</span>
            <span className="text-xs">Date: {date}</span>
          </div>
          <h1 className="text-lg font-bold mt-1">Cash Receipt Voucher</h1>
        </div>

        {/* Student/Payer Information */}
        <div className="mb-4 border-t-2 border-b-2 border-blue-600 py-2">
          <h3 className="font-bold text-sm mb-2">STUDENT / PAYER INFORMATION</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Registration No.:</span>
              <span>{regNo}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Course / Program</span>
              <span>{chooseCourse}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Student Name:</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Batch / Unit</span>
              <span>{batchUnit}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Father&apos;s Name:</span>
              <span>{fatherName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Contact Number:</span>
              <span>{whatsappNumber}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">City:</span>
              <span>{district}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Address</span>
              <span>{tehsil}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-4 border-b-2 border-blue-600 py-2">
          <h3 className="font-bold text-sm mb-2">PAYMENT DETAILS</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold">Payment Method</span>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked={paymentMethod === "Cash"} className="mr-1" />
                  Cash
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked={paymentMethod === "Bank Transfer"} className="mr-1" />
                  Bank Transfer
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked={paymentMethod === "Easypaisa"} className="mr-1" />
                  Easypaisa
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked={paymentMethod === "JazzCash"} className="mr-1" />
                  JazzCash
                </label>
              </div>
            </div>
            <div>
              <div className="flex justify-between border-b border-gray-300">
                <span className="font-semibold">Transaction / Reference No:</span>
                <span>{regNo}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 mt-2">
                <span className="font-semibold">Bank Name (if applicable):</span>
                <span>{bankName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="mb-4">
          <h3 className="font-bold text-sm mb-1">FEE BREAKDOWN</h3>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="border border-gray-400 p-2 text-left">PARTICULARS</th>
                <th className="border border-gray-400 p-2 text-left">DESCRIPTION</th>
                <th className="border border-gray-400 p-2 text-right w-24">AMOUNT (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {particulars.map((item, index) => (
                <tr key={index} className={item.label.includes("Discount") ? "bg-yellow-50" : ""}>
                  <td className="border border-gray-400 p-2">
                    <span className={item.label.includes("Discount") ? "text-red-600 font-semibold" : ""}>
                      {item.label}
                    </span>
                  </td>
                  <td className="border border-gray-400 p-2">{item.description}</td>
                  <td className="border border-gray-400 p-2 text-right">
                    <span className={item.label.includes("Discount") ? "text-red-600 font-semibold" : ""}>
                      {item.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
              {particulars.length < 6 &&
                [...Array(6 - particulars.length)].map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td className="border border-gray-400 p-2 h-6"></td>
                    <td className="border border-gray-400 p-2 h-6"></td>
                    <td className="border border-gray-400 p-2 h-6"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Amount Summary */}
        <div className="mb-4 grid grid-cols-3 gap-4 text-xs">
          <div className="flex justify-between border-b border-gray-300">
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300">
            <span className="text-red-600">Discount:</span>
            <span className="text-red-600">{Math.abs(discount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b-2 border-black font-bold">
            <span>TOTAL AMOUNT:</span>
            <span>{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300">
            <span className="text-green-600 font-semibold">Amount Received:</span>
            <span className="text-green-600">{amountReceived.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300">
            <span className="text-red-600 font-semibold">Remaining Balance:</span>
            <span className="text-red-600">{remainingBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mb-4 bg-yellow-50 p-2 border border-gray-300">
          <h3 className="font-bold text-xs mb-1">AMOUNT IN WORDS:</h3>
          <p className="text-xs italic">{amountToWords(totalAmount)}</p>
        </div>

        {/* Signature Section */}
        <div className="mt-6 pt-4 border-t-2 border-gray-800">
          <div className="grid grid-cols-3 gap-4 text-xs text-center">
            <div>
              <div className="h-8 border-t border-black mb-1"></div>
              <span className="font-semibold">Prepared By</span>
              <p className="text-xs">(Signature & Date)</p>
            </div>
            <div>
              <div className="h-8 border-t border-black mb-1"></div>
              <span className="font-semibold">Checked By</span>
              <p className="text-xs">(Signature & Date)</p>
            </div>
            <div>
              <div className="h-8 border-t border-black mb-1"></div>
              <span className="font-semibold">Accountant / Authorized Sign</span>
              <p className="text-xs">(Official Stamp & Signature)</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 text-xs border-t pt-2">
          <p className="text-xs">
            <span className="font-bold">Note:</span> Fee once paid is non-refundable. Keep this receipt for future reference.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs mt-4 py-2 border-t border-gray-300">
          <p className="font-semibold">STUDENT COPY - Keep for your records</p>
        </div>
      </div>
    </>
  );
};

export default Challan;

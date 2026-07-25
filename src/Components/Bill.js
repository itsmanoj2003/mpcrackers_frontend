import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = (order, orderId) => {
    const doc = new jsPDF();

    // ---------- Header ----------
    doc.setFillColor(198, 40, 40);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MP CRACKERS", 14, 15);

    doc.setFontSize(10);
    doc.text("Premium Quality Fireworks - Sivakasi", 14, 22);

    doc.setFontSize(18);
    doc.text("INVOICE", 155, 18);

    // ---------- Invoice Details ----------
    let y = 42;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text(`Order ID : ${orderId}`, 14, y);
    doc.text(
        `Invoice Date : ${new Date(order.createdAt).toLocaleDateString()}`,
        120,
        y
    );

    // ---------- Customer ----------
    y += 12;

    doc.setFillColor(255, 152, 0);
    doc.rect(14, y - 6, 182, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("CUSTOMER DETAILS", 16, y);

    y += 8;

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(`Name : ${order.name}`, 16, y);

    y += 7;
    doc.text(`Mobile : ${order.mobile}`, 16, y);

    y += 7;
    doc.text(`Address : ${order.address}`, 16, y);

    y += 7;
    doc.text(
        `City : ${order.city}   District : ${order.district}`,
        16,
        y
    );

    y += 7;
    doc.text(
        `State : ${order.state}   Pincode : ${order.pincode}`,
        16,
        y
    );

    // ---------- Products ----------
    y += 12;

    autoTable(doc, {
        startY: y,

        head: [[
            "S.No",
            "Product",
            "Qty",
            "Price",
            "Subtotal"
        ]],

        body: order.items.map((item, index) => [
            index + 1,
            item.productName,
            item.quantity,
            `Rs.${item.price}`,
            `Rs.${item.subtotal}`
        ]),

        theme: "grid",

        headStyles: {
            fillColor: [198, 40, 40],
            halign: "center"
        },

        styles: {
            fontSize: 10
        }
    });

    y = doc.lastAutoTable.finalY + 12;

    // ---------- Summary ----------
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(120, y, 76, 35, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text(
        `Total Items : ${order.totalItems}`,
        125,
        y + 8
    );

    doc.text(
        `Total Qty : ${order.totalQuantity}`,
        125,
        y + 16
    );

    doc.setTextColor(46, 125, 50);

    doc.setFontSize(13);

    doc.text(
        `Grand Total : Rs.${order.grandTotal}`,
        125,
        y + 28
    );

    // ---------- Payment ----------
    y += 50;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    doc.text(
        "Payment Mode : ONLINE PAYMENT",
        14,
        y
    );

    y += 8;

    doc.text(
        `Transaction ID : ${order.paymentId}`,
        14,
        y
    );

    // ---------- Footer ----------
    y += 20;

    doc.setDrawColor(200);
    doc.line(14, y, 196, y);

    y += 10;

    doc.setTextColor(198, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    doc.text(
        "Thank You For Shopping With MP CRACKERS",
        28,
        y
    );

    y += 8;

    doc.setTextColor(80);
    doc.setFontSize(11);

    doc.text(
        "We Wish You A Safe & Happy Celebration!",
        52,
        y
    );

    doc.save(`${orderId}.pdf`);
};

export default generateInvoice;
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useOrderDetails, useEditOrder } from '@/hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatCurrency, formatDate } from '@/utils/orderHelpers';

export const useOrderDetailsPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const orderShortId = decodeURIComponent((params.orderShortId as string) || '');

  const { data: orderData, isLoading } = useOrderDetails(orderShortId);
  const order = orderData?.order;
  const editOrderMutation = useEditOrder();

  const [editOrderModalOpen, setEditOrderModalOpen] = useState(false);
  const [editContactModalOpen, setEditContactModalOpen] = useState(false);
  const [editShippingModalOpen, setEditShippingModalOpen] = useState(false);
  const [editBillingModalOpen, setEditBillingModalOpen] = useState(false);
  const [editPaymentModalOpen, setEditPaymentModalOpen] = useState(false);

  const handlePrint = () => {
    if (!order) {
      toast.error('Order data not available');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print');
      return;
    }

    const summary = order.orderSummary || { subtotal: 0, tax: 0, shipping: 0, total: 0 };
    const customer = order.customerInfo || { name: '', email: '', phone: '' };
    const items = order.orderItems || [];

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.orderShortId}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              padding: 40px; 
              color: #333;
              line-height: 1.6;
            }
            .header { 
              margin-bottom: 40px; 
              border-bottom: 2px solid #201781;
              padding-bottom: 20px;
            }
            .header h1 { 
              color: #201781; 
              margin-bottom: 10px;
              font-size: 28px;
            }
            .section { 
              margin-bottom: 30px; 
            }
            .section h2 {
              color: #201781;
              margin-bottom: 15px;
              font-size: 20px;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 15px;
              margin-bottom: 20px;
            }
            th, td { 
              padding: 12px; 
              text-align: left; 
              border-bottom: 1px solid #ddd; 
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .total-row {
              font-weight: bold;
              font-size: 16px;
              background-color: #f9f9f9;
            }
            .customer-info {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Order Invoice</h1>
            <p><strong>Order ID:</strong> ${order.orderShortId}</p>
            <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          
          <div class="section">
            <h2>Customer Information</h2>
            <div class="customer-info">
              <p><strong>Name:</strong> ${customer.name || 'N/A'}</p>
              <p><strong>Email:</strong> ${customer.email || 'N/A'}</p>
              <p><strong>Phone:</strong> ${customer.phone || 'N/A'}</p>
            </div>
          </div>

          ${
            items.length > 0
              ? `
          <div class="section">
            <h2>Order Items</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map((item: any) => {
                    const itemTotal = item.price.reduce((sum: number, priceItem: any) => {
                      return sum + priceItem.amount * priceItem.quantity;
                    }, 0);
                    return `
                    <tr>
                      <td>${item.title || 'N/A'}</td>
                      <td>${item.quantity || 1}</td>
                      <td>${formatCurrency(item.price[0]?.amount || 0)}</td>
                      <td>${formatCurrency(itemTotal)}</td>
                    </tr>
                  `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
          `
              : ''
          }

          <div class="section">
            <h2>Order Summary</h2>
            <table>
              <tr>
                <td>Subtotal:</td>
                <td style="text-align: right;">${formatCurrency(summary.subtotal)}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td style="text-align: right;">${formatCurrency(summary.shipping)}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td style="text-align: right;">${formatCurrency(summary.tax)}</td>
              </tr>
              ${
                summary.discount > 0
                  ? `
              <tr>
                <td>Discount:</td>
                <td style="text-align: right; color: green;">-${formatCurrency(summary.discount)}</td>
              </tr>
              `
                  : ''
              }
              <tr class="total-row">
                <td><strong>Total:</strong></td>
                <td style="text-align: right;"><strong>${formatCurrency(summary.total)}</strong></td>
              </tr>
            </table>
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleEditOrder = () => {
    setEditOrderModalOpen(true);
  };

  const handleSaveOrder = async (data: any) => {
    try {
      await editOrderMutation.mutateAsync({
        orderShortId,
        data,
      });
      queryClient.invalidateQueries({ queryKey: ['order-details', orderShortId] });
      toast.success('Order updated successfully', {
        style: { background: '#e7f6f1', color: '#16a87e' },
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleEditInfo = (section: string) => {
    switch (section) {
      case 'contact':
        setEditContactModalOpen(true);
        break;
      case 'shipping':
        setEditShippingModalOpen(true);
        break;
      case 'billing':
        setEditBillingModalOpen(true);
        break;
      case 'payment':
        setEditPaymentModalOpen(true);
        break;
      default:
        toast.info(`Edit ${section} functionality`);
    }
  };

  const handleSaveContactInfo = async (data: any) => {
    await handleSaveOrder(data);
  };

  const handleSaveAddress = async (data: any) => {
    await handleSaveOrder(data);
  };

  const handleSavePaymentMethod = async (data: any) => {
    toast.info('Payment method update is not available');
  };

  return {
    order,
    isLoading,
    orderShortId,
    handlePrint,
    handleEditOrder,
    handleEditInfo,
    editOrderModalOpen,
    setEditOrderModalOpen,
    editContactModalOpen,
    setEditContactModalOpen,
    editShippingModalOpen,
    setEditShippingModalOpen,
    editBillingModalOpen,
    setEditBillingModalOpen,
    editPaymentModalOpen,
    setEditPaymentModalOpen,
    handleSaveOrder,
    handleSaveContactInfo,
    handleSaveAddress,
    handleSavePaymentMethod,
  };
};

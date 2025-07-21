import { useFetchOrdersQuery } from '../../../hooks/useFetchOrdersQuery';
import OrderEmptyView from './OrderEmptyView';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';

export default function OrderSection() {
  const { data } = useFetchOrdersQuery('123');

  return (
    <>
      {!data || data.length == 0 ? (
        <OrderEmptyView />
      ) : (
        <div className="wrapper flex w-full flex-1 flex-col pt-6">
          <OrderSummary
            totalCount={data.length ?? 0}
            totalPrice={
              data.reduce((sum, order) => sum + order.totalPrice, 0) ?? 0
            }
          />
          <OrderList orders={data} />
          <div className="h-48"></div>
        </div>
      )}
    </>
  );
}

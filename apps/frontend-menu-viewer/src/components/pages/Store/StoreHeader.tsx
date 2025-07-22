import BellSvg from '@/assets/icons/ic_bell.svg?react';
import BillSvg from '@/assets/icons/ic_bill.svg?react';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router';

export default function StoreHeader() {
  return (
    <div className="sticky top-0 z-10 h-12 bg-white shadow-sm">
      <div className="wrapper flex w-full items-center justify-end">
        <div className="flex items-center gap-2">
          <Link to={ROUTES.CALL_STAFF}>
            <button className="text-mb-5 flex flex-wrap items-center text-gray-700">
              <BellSvg className="text-gray-700" />
              <span> 호출하기</span>
            </button>
          </Link>
          <Link to={ROUTES.ORDERS}>
            <button className="text-mb-5 flex flex-wrap items-center text-gray-700">
              <BillSvg className="text-gray-700" />
              <span> 주문내역</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

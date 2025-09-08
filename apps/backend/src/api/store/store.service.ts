import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Day, PrismaClient } from '@prisma/client';

import { CreateStoreDto } from './dto/create-store.dto';

const dayToKorean: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createStoreDto: CreateStoreDto, storeId: number) {
    try {
      const data = { ...createStoreDto };

      if (data.time) {
        await this.prisma.hours.deleteMany({
          where: { storeId },
        });

        const hoursData = data.time.map((t) => ({
          storeId: storeId,
          day: t.day.toUpperCase() as Day,
          startHour: t.startHour,
          startMin: t.startMin,
          endHour: t.endHour,
          endMin: t.endMin,
          open: t.open,
        }));

        await this.prisma.hours.createMany({
          data: hoursData,
        });

        delete data.time;
      }

      return this.prisma.store.update({
        where: { id: storeId },
        data,
      });
    } catch (error) {
      console.error('Store create 에러:', error);
      throw new InternalServerErrorException(
        '매장 생성/수정 중 오류가 발생했습니다.',
      );
    }
  }
  async getStore(storeId: number) {
    try {
      //가게 정보 조회
      const store = await this.prisma.store.findFirst({
        where: { id: storeId },
      });

      //순서 조회
      const infoOrder = await this.prisma.informationOrder.findFirst({
        where: { storeId },
      });

      //영업 시간 조회
      const hours = await this.prisma.hours.findMany({
        where: { storeId },
        orderBy: { day: 'asc' },
      });

      //영업 시간 데이터 가공
      const openHourValue = hours
        .filter((h) => h.open)
        .map(
          (h) =>
            `${dayToKorean[h.day]} ${String(h.startHour).padStart(2, '0')}:${String(h.startMin).padStart(2, '0')}~${String(h.endHour).padStart(2, '0')}:${String(h.endMin).padStart(2, '0')}`,
        )
        .join(', ');

      //정보 가공
      const infoItems = [
        { key: 'openHour', value: openHourValue, order: infoOrder?.hoursOrder },
        {
          key: 'isBusinessTimeSame',
          value: store?.isBusinessTimeSame ? '동일' : '다름',
        },
        {
          key: 'wifi',
          value:
            store?.wifiId && store?.wifiPassword
              ? `ID ${store.wifiId} / PW ${store.wifiPassword}`
              : '',
          order: infoOrder?.wifiOrder,
        },
        {
          key: 'phoneNumber',
          value: store?.phoneNumber,
          order: infoOrder?.phoneNumberOrder,
        },
        {
          key: 'naverPlace',
          value: store?.naverPlace,
          order: infoOrder?.naverPlaceOrder,
        },
        {
          key: 'corkage',
          value:
            store?.corkagePossible === true
              ? store?.corkagePrice === 0
                ? '가능 (무료)'
                : `가능 (${store?.corkagePrice}원)`
              : '불가능',
          order: infoOrder?.corkageOrder,
        },
        {
          key: 'toilet',
          value: store?.toilet,
          order: infoOrder?.ToiletOrder,
        },
      ].sort((a, b) =>
        (a.order ?? 'zzzzzzzz').localeCompare(b.order ?? 'zzzzzzzz'),
      );

      return {
        id: storeId,
        name: store?.store,
        infoItems,
      };
    } catch (error) {
      console.error('Store get 에러:', error);
      throw new InternalServerErrorException(
        '매장 정보 조회 중 오류가 발생하였습니다',
      );
    }
  }
}

'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const salesData = [
  { time: '1월', 소주: 85, 맥주: 120, 칵테일: 45, 막걸리: 30 },
  { time: '2월', 소주: 90, 맥주: 110, 칵테일: 50, 막걸리: 35 },
  { time: '3월', 소주: 95, 맥주: 130, 칵테일: 60, 막걸리: 40 },
  { time: '4월', 소주: 88, 맥주: 125, 칵테일: 55, 막걸리: 42 },
  { time: '5월', 소주: 92, 맥주: 140, 칵테일: 65, 막걸리: 38 },
  { time: '6월', 소주: 100, 맥주: 150, 칵테일: 70, 막걸리: 45 },
];

const hourlyData = [
  { hour: '12시', 손님수: 5 },
  { hour: '1시', 손님수: 8 },
  { hour: '2시', 손님수: 12 },
  { hour: '3시', 손님수: 15 },
  { hour: '4시', 손님수: 20 },
  { hour: '5시', 손님수: 35 },
  { hour: '6시', 손님수: 45 },
  { hour: '7시', 손님수: 60 },
  { hour: '8시', 손님수: 85 },
  { hour: '9시', 손님수: 75 },
  { hour: '10시', 손님수: 65 },
  { hour: '11시', 손님수: 40 },
];

const snackData = [
  { name: '치킨', value: 240, color: '#FFB800' },
  { name: '족발', value: 180, color: '#FF6B35' },
  { name: '피자', value: 150, color: '#4ECDC4' },
  { name: '오징어', value: 120, color: '#45B7D1' },
  { name: '기타', value: 90, color: '#96CEB4' },
];

const revenueData = [
  { month: '1월', 매출: 2600000 },
  { month: '2월', 매출: 2800000 },
  { month: '3월', 매출: 3200000 },
  { month: '4월', 매출: 2950000 },
  { month: '5월', 매출: 3400000 },
  { month: '6월', 매출: 3800000 },
];

const StatCard = ({
  title,
  value,
  unit,
  change,
  color = 'blue',
}: {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  color?: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        {change && (
          <div className="flex items-center mt-1">
            <span
              className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500 ml-1">전월 대비</span>
          </div>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}
      >
        <div className={`w-6 h-6 rounded-full bg-${color}-500`}></div>
      </div>
    </div>
  </div>
);

const ChartCard = ({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const TimeFilter = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (period: string) => void;
}) => (
  <div className="flex bg-gray-100 rounded-lg p-1">
    {['오늘', '어제', '일주일', '1개월', '3개월', '6개월', '전체'].map(
      (period) => (
        <button
          key={period}
          onClick={() => onSelect(period)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            selected === period
              ? 'bg-gray-800 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {period}
        </button>
      ),
    )}
  </div>
);

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('오늘');
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">메뉴 관리</h1>
              <div className="flex items-center mt-1">
                <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                  노원구
                </span>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded ml-2">
                  손님 케어관리 편의
                </span>
              </div>
            </div>
            <TimeFilter
              selected={selectedPeriod}
              onSelect={setSelectedPeriod}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 보기 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            통계 보기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="오늘 매출"
              value="260,000"
              unit="원"
              change="+12.5%"
              color="blue"
            />
            <StatCard
              title="오늘 방문객"
              value="146"
              unit="명"
              change="+8.3%"
              color="green"
            />
            <StatCard
              title="평균 객단가"
              value="18,500"
              unit="원"
              change="+5.2%"
              color="purple"
            />
            <StatCard
              title="이번달 총 매출"
              value="7,800,000"
              unit="원"
              change="+15.7%"
              color="orange"
            />
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 시간대별 손님 수 */}
          <ChartCard title="시간대별 손님 수">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="손님수"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 가장 많이 팔린 안주 */}
          <ChartCard title="가장 많이 팔린 안주">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={snackData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {snackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {snackData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-800 ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* 월별 술 판매량 & 월별 매출 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 월별 술 판매량 */}
          <ChartCard title="월별 술 판매량">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="소주" fill="#FFB800" radius={[2, 2, 0, 0]} />
                <Bar dataKey="맥주" fill="#4ECDC4" radius={[2, 2, 0, 0]} />
                <Bar dataKey="칵테일" fill="#FF6B6B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="막걸리" fill="#95E1D3" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 월별 매출 */}
          <ChartCard title="월별 매출 추이">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: any) => [
                    `${(value / 10000).toLocaleString()}만원`,
                    '매출',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="매출"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: '#6366F1', strokeWidth: 0, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: '#6366F1',
                    strokeWidth: 2,
                    fill: '#fff',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 추천 및 인사이트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 술 추천 */}
          <ChartCard title="재고 부족 & 추천 술">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-red-800">재고 부족</h4>
                    <p className="text-sm text-red-600">참이슬, 카스 맥주</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-blue-800">추천 주문</h4>
                    <p className="text-sm text-blue-600">
                      칵테일 수요 증가로 진, 보드카 추가 주문 권장
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-green-800">잘 나가는 술</h4>
                    <p className="text-sm text-green-600">
                      하이볼, 맥주 꾸준한 판매량 유지
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* 운영 인사이트 */}
          <ChartCard title="운영 인사이트">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">피크 시간대</h4>
                  <p className="text-sm text-gray-600">
                    오후 8-9시 손님이 가장 많습니다
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">주말 vs 평일</h4>
                  <p className="text-sm text-gray-600">
                    주말 매출이 평일 대비 35% 높습니다
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">계절별 추세</h4>
                  <p className="text-sm text-gray-600">
                    여름철 맥주, 겨울철 소주 판매량 증가
                  </p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

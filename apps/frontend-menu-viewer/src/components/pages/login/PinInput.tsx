import ErrorSvg from '@/assets/icons/ic_error_red.svg?react';
import { ROUTES } from '@/constants/routes';
import { getStoreId } from '@/utilities/getStoreId';
import { getDeviceType } from '@/utilities/parseUserAgent';
import { showCustomToast } from '@/utilities/showToast';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function PinInput() {
  const answer = '12345';
  const navigate = useNavigate();
  const [values, setValues] = useState(Array(5).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const deviceType = getDeviceType();
    if (deviceType === 'mobile') {
      showCustomToast({ icon: 'error', message: '잘못된 접근이에요.' });
      navigate(ROUTES.ROOT);
    }
  }, [navigate]);

  useEffect(() => {
    const joined = values.join('');
    if (joined.length === 5) {
      if (joined === answer) {
        setIsError(false);
        showCustomToast({ icon: 'check', message: '로그인에 성공했어요.' });
        navigate(ROUTES.STORES.DETAIL(getStoreId()));
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  }, [values, answer, navigate]);

  useEffect(() => {
    if (activeIndex >= 0) {
      const input = inputsRef.current[activeIndex];
      if (input) {
        input.focus();
      }
    }
  }, [activeIndex]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // pin 번호 정책 확인 필요

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 4) {
      const nextIndex = index + 1;
      setActiveIndex(nextIndex);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace') {
      if (values[index]) {
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        const newValues = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
        setActiveIndex(index - 1);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    setActiveIndex(parseInt(e.target.dataset.index || '0'));

  const handleBlur = () => {
    setTimeout(() => {
      const isAnyFocused = inputsRef.current.some(
        (input) => input && document.activeElement === input,
      );
      if (!isAnyFocused) {
        setActiveIndex(-1);
      }
    }, 10);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        {values.map((val, idx) =>
          idx !== activeIndex && values[idx] != '' ? (
            <div
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
              }}
              className=" bg-gray-100 w-[4.25rem] h-[4.75rem] rounded-2xl flex flex-col items-center justify-center"
            >
              <div className="rounded-full w-3.5 h-3.5 bg-gray-800"> </div>
            </div>
          ) : (
            <input
              key={idx}
              data-index={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type={activeIndex == idx ? 'text' : 'password'}
              inputMode="numeric"
              maxLength={1}
              value={val}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`border-2 border-yellow-400/0 focus:border-yellow-400 focus:bg-white bg-gray-100 w-[4.25rem] h-[4.75rem] rounded-2xl text-center text-mb-2 text-black outline-none duration-300 transition 
      `}
            />
          ),
        )}
      </div>
      {isError && (
        <p className="flex items-center gap-2.5 justify-center">
          <ErrorSvg />
          <span className="text-mb-2 text-gray-900">다시 입력해주세요</span>
        </p>
      )}
    </div>
  );
}

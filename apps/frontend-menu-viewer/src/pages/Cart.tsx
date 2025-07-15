import BaseButton from '@/components/common/BaseButton';
import Header from '../components/common/\bHeader';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { showCustomToast } from '../utils/showToast';


export default function Cart() {
  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <Header title="카트" />
      <div className="wrapper flex w-full flex-1 flex-col pb-7 pt-6">
   
      <ButtonWrapper>
            <BaseButton
              onClick={() =>
                showCustomToast({ icon: 'bell', message: '호출하기를 했어요' })
              }
              color="black"
            >
              호출하기
            </BaseButton>
          </ButtonWrapper>
      </div>
    </div>
  );
}

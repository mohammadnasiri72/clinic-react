import SelectFieldOrder from './SelectFieldOrder';
import TableOrder from './TableOrder';

export default function Order({ patSelected, setIsLoading , setIsOpenOrder , setOrderEdit , isOpenOrder , flag , setFlag}) {
  
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-1/3 w-full">
          <SelectFieldOrder patSelected={patSelected} setIsLoading={setIsLoading} setFlag={setFlag} flag={flag}/>
        </div>
        <div className="lg:w-2/3 w-full">
          <TableOrder patSelected={patSelected} setIsLoading={setIsLoading} flag={flag} setFlag={setFlag} setIsOpenOrder={setIsOpenOrder} setOrderEdit={setOrderEdit} isOpenOrder={isOpenOrder}/>
        </div>
      </div>
      
    </>
  );
}

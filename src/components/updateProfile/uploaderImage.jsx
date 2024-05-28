import { Button, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import Swal from 'sweetalert2';
// import { Account, Change } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import ProgressBarUpdateProfile from './ProgressBarUpdateProfile';

export default function UploaderImage({ setPageState , account , setChang}) {
  const[avatarTemporary , setAvatarTemporary] = useState('')
  const[fileAtt , setFileAtt] = useState('')
  const [valProgres, setValProgres] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState('');
  // const account = useContext(Account);

  // const setChange = useContext(Change);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  

  // const [file, setFile] = useState('');
  
  const viewImgHandler = (e) => {
    setIsLoading(true);
    // setFile(e.target.files[0]);
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    axios
      .post(`${mainDomain}/api/File/Upload/Image`, fileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setFileAtt(res.data);
        setAvatarTemporary(`${mainDomain}/uploads/temp_up/${res.data}`)
        // const fileSrc = new FormData();
        // fileSrc.append('fileSrc', fileAtt);
        // const data = {
        //   fileSrc: fileAtt,
        //   userId: accountUpdate ? accountUpdate.userId : localStorage.getItem('userId'),
        // };
        // axios
        //   .post(mainDomain + '/api/Patient/Avatar/Update', data, {
        //     headers: {
        //       Authorization: 'Bearer ' + localStorage.getItem('token'),
        //     },

        //     onUploadProgress: (val) => {
        //       setValProgres(parseInt(Math.round((val.loaded * 100) / val.total)));
        //     },
        //   })
        //   .then((res) => {
        //     setIsLoading(false);
        //     setValProgres(0);
        //     setChange((e) => !e);
        //     // setPageState(0)
        //     Toast.fire({
        //       icon: 'success',
        //       text: 'تصویر پروفایل با موفقیت بروز رسانی شد',
        //     });
        //   })
        //   .catch((err) => {
        //     setIsLoading(false);
        //     Toast.fire({
        //       icon: 'error',
        //       text: err.response ? err.response.data : 'خطای شبکه',
        //     });
        //   });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const inpImg = useRef();
  const selectImgHandler = () => {
    inpImg.current.click();
  };

  const uploadImgHandler = ()=>{
    if (fileAtt) {
      setIsLoading(true)
      const data = {
        fileSrc: fileAtt,
        userId: account.userId,
      };
      axios
        .post(`${mainDomain}/api/Patient/Avatar/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
  
          onUploadProgress: (val) => {
            setValProgres(Number(Math.round((val.loaded * 100) / val.total)));
          },
        })
        .then((res) => {
          setIsLoading(false);
          setValProgres(0);
          setChang((e) => !e);
          // setPageState(0)
          setFileAtt('')
          // setPageState(0)
          Toast.fire({
            icon: 'success',
            text: 'تصویر پروفایل با موفقیت بروز رسانی شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
      
    }
  }
  useEffect(()=>{
    if (avatarTemporary) {
      setSrc(avatarTemporary)
    }else{
      setSrc(mainDomain + account.avatar)
    }
  },[account , avatarTemporary])
  return (
    <>
      <div className="border rounded-lg h-full pt-5 relative">
        <div className="flex justify-start">
          <h3 className='px-5'>تصویر پروفایل</h3>
        </div>
        <input className="opacity-0 invisible" ref={inpImg} onChange={viewImgHandler} type="file" />
        <Paper
        sx={{borderRadius: '100%'}}
          onClick={selectImgHandler}
          className="border-dashed relative border border-black w-32 h-32 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer mx-auto  box-avatar"
        >
          {(account.picture) && (
            <img className="w-full h-full rounded-full duration-300 object-cover" src={src} alt="" />
          )}

          {!account.picture && (
            <div className="flex justify-center items-center flex-col opacity-50 hover:opacity-100 duration-300 w-full h-full rounded-full absolute">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">آپلود تصویر</span>
            </div>
          )}
          {(account.picture) && (
            <div className="flex justify-center items-center flex-col opacity-0 hover:opacity-50 duration-300 w-full h-full rounded-full absolute text-white">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">تغییر تصویر</span>
            </div>
          )}
        </Paper>

        <div className="p-5 mx-auto">
          {/* <LinearProgress style={{display: valProgres===100?'none':'block'}} variant="determinate" value={valProgres} /> */}
          <div>
            <ProgressBarUpdateProfile valProgres={valProgres} />
          </div>
        </div>
        <div className='mb-20'>
        <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        <p className="text-xs mt-2"> max size of 3.1 MB</p>
        </div>
        <div className='absolute bottom-5 right-5'>
          {/* <Button onClick={uploadImgHandler} variant="contained" color='info'>آپلود تصویر</Button> */}
          <Button
          disabled={!fileAtt}
              onClick={uploadImgHandler}
              size="medium"
              sx={{
                py: 1,
                fontSize: 16,
                backgroundColor: 'rgb(6 182 212)',
                '&:hover': {
                  backgroundColor: 'rgb(8 145 178)',
                },
              }}
              className="rounded-md text-white mt-5 duration-300"
              variant="contained"
              // className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white"
            >
              آپلود تصویر
            </Button>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}

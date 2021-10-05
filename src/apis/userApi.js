import callApi from "../utils/callApi";
import axios from 'axios'

const userApi = {
    loginApi(user) {
      return callApi('QuanLyNguoiDung/DangNhap', 'POST', user);
    },
    signUpApi(user){
      return callApi('QuanLyNguoiDung/DangKy', 'POST', user);
    },
    layDanhSachNguoiDung(){
      return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP15`);
     },
     searchUser(taiKhoan){
      return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP15&tuKhoa=${taiKhoan}`);
     },
     themNguoiDung(value){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThemNguoiDung`,
        method: 'POST',
        data: value,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     },
     xoaNguoiDung(taiKhoan){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
    },
    capNhatNguoiDung(value){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: 'POST',
        data: value,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     },
     layThongTin(maNhom, taiKhoan){
      return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${taiKhoan}`)
     },
     updateUser(value){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: 'PUT',
        data: value,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     }
  };
  export default userApi;
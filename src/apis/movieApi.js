import callApi from "../utils/callApi";
import axios from 'axios'
import { GROUP_ID, TOKEN } from "../setting/apiConfig";
import { ThongTinDatVe } from "../core/ThongTinDatVe";
const movieApi = {
    getCarousel(){
        return  axios({
            url: `https://60f148c938ecdf0017b0fb56.mockapi.io/Banner`,
            method: 'GET',
          });
    },
    getComment(){
      return  axios({
        url: `https://60f148c938ecdf0017b0fb56.mockapi.io/MovieComment`,
        method: 'GET',
      });
    },
    fetchAllMovie(){
      return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    },
    fetchViewingTimes(){
      return callApi(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
    },
    fetchDetailMovie(id){
      return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    },
    getShowtime(movieId) {
      return callApi(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${movieId}`);
    },
    bookTicket(thongTinDatVe = new ThongTinDatVe(), token){
      return callApi('QuanLyDatVe/DatVe', 'POST', thongTinDatVe, token);
    },
    getHistoryBooking(token){
      return callApi('QuanLyNguoiDung/ThongTinTaiKhoan', 'POST', token);
    },
    searchFilm(tenPhim){
      return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=GP15&tenPhim=${tenPhim}`);
     },
     addFilm(formData, token){
      return callApi(`QuanLyPhim/ThemPhimUploadHinh`, 'POST', formData, token);
     },
     deleteFilm(maPhim){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     },
     layThongTinPhim(id){
      return callApi(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
     },
     editFilm(formData){
      return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/CapNhatPhimUpload`,
        method: 'POST',
        data: formData,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     },
     addLich(form){
      return  axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyDatVe/TaoLichChieu`,
        method: 'POST',
        data: form,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
      });
     },
     layHeThongRap(){
      return  axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinHeThongRap`,
        method: 'GET',
      });
     },
     layCumRap(heThongRap){
      return  axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${heThongRap}`,
        method: 'GET',
      });
     },
     addComment(comment) {
      return axios({
          url: 'https://60f148c938ecdf0017b0fb56.mockapi.io/MovieComment',
          method: 'POST',
          data: comment,
      })
  },
  deleteComment(id) {
    return axios({
        url: `https://60f148c938ecdf0017b0fb56.mockapi.io/MovieComment/${id}`,
        method: 'DELETE',
    })
}
  };
  
  export default movieApi;
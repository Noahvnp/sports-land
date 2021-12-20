/*
    File: sanPham.js
    @IT lecturer: B1910107	Phan Van Nam,
    @updated: Dec-19-2021
*/

/*---------------- JavaScript cho danh sách sản phẩm bên sanpham.html ----------------*/ 
function loadShoppingCart() {
    // Kiểm tra local storage đã có danh sách sản phẩm chưa.
    // Nếu chưa thì khởi tạo
    var danhSachSanPham = JSON.parse(localStorage.getItem('danhSachSanPham')); 
    if (danhSachSanPham === null) {
        var danhSachSanPham = new Array();
        // Lấy tất cả sản phẩm hiện có đưa vào localStorage
        var allProducts = document.querySelectorAll('.box-container__box');
        // Lưu từng sản phẩm vào mảng
        for(let product of allProducts) {
            // Truy cập các node để lấy dữ liệu
            var imgProduct = product.querySelector('.box__image').innerHTML;
            var nameProduct = product.querySelector('.box__content h3').textContent;
            var priceProduct = product.querySelector('.item-price').textContent;
            var sizeProduct = product.querySelector('.box__content--size #size').value;
            // 2. Tạo đối tượng từ dữ liệu đang có
            let sanPham = taoDoiTuongSanPham(imgProduct, nameProduct, priceProduct, sizeProduct, null);
            console.log(sanPham);

            // 3. Đưa sản phẩm vào danh sách
            danhSachSanPham.push(sanPham);

            // Lưu trữ danh sách sản phẩm xuống local storage
            let jsonDanhSachSanPham = JSON.stringify(danhSachSanPham)
            localStorage.setItem('danhSachSanPham', jsonDanhSachSanPham);
        }
    }

    // Ghi đè lại nút thêm giỏ hàng với id tương ứng của sản phẩm
    function ghiDeOnclick(viTri) {
        let HTML = '<a onclick="onclickDuaVaoGioHang(\''+ danhSachSanPham[viTri].id + '\')" class="fas fa-shopping-cart"></a>'
                    + '<a href="#" class="fas fa-heart"></a>\n'
                    +'<a href="#" class="fas fa-eye"></a>';;
        return HTML;
    }

    var btnAddProduct = document.querySelectorAll('.box__icons');
    for (let i = 0; i < btnAddProduct.length; i++){
        var HTMLOfBtnProduct = ghiDeOnclick(i);
        btnAddProduct[i].innerHTML = HTMLOfBtnProduct;
    }    
}


function onclickDuaVaoGioHang(idSanPham) {    

    // Xây dựng hàm tạo nhanh đối tượng item giỏ hàng ==> gioHang.js
    // Lấy danh sách giỏ hàng có trong local storage ra
    var danhSachItemGioHang = layDanhSachItemGioHang();
    var coTonTaiTrongDanhSachItemGioHang = false;

    for(var i = 0; i < danhSachItemGioHang.length; i++) {
        var itemGioHangHienTai = danhSachItemGioHang[i];
        // Nếu tồn tại sản phẩm thì tăng số lượng
        if(itemGioHangHienTai.idSanPham === idSanPham) {
            danhSachItemGioHang[i].soLuong++;
            coTonTaiTrongDanhSachItemGioHang = true;
        }
    }
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng thì thêm mới 1 item giỏ hàng, quantity = 1;
    if(coTonTaiTrongDanhSachItemGioHang == false) {
        var itemGioHang = taoDoiTuongItemGioHang(null, idSanPham, 1);
        danhSachItemGioHang.push(itemGioHang);
    }
    // Lưu trữ lại vào local storage
    luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
    // alert('Thêm sản phẩm thành công!');
    window.location.reload(); 
}



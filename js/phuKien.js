/*
    File: phuKien.js
    @IT lecturer: B1910107	Phan Van Nam
    @updated: Dec-19-2021
*/

/*---------------- JavaScript cho danh sách sản phẩm bên phuKien.html ----------------*/ 
function loadShoppingCart() {
    // Kiểm tra local storage đã có danh sách sản phẩm chưa.
    // Nếu chưa thì khởi tạo
    var danhSachPhuKien = JSON.parse(localStorage.getItem('danhSachPhuKien')); 
    if (danhSachPhuKien === null) {
        var danhSachPhuKien = new Array();
        // Lấy tất cả sản phẩm hiện có đưa vào localStorage
        var allProducts = document.querySelectorAll('.box-container__box');
        // Lưu từng sản phẩm vào mảng
        for(let product of allProducts) {
            // Truy cập các node để lấy dữ liệu
            var imgProduct = product.querySelector('.box__image').innerHTML;
            var nameProduct = product.querySelector('.box__content h3').textContent;
            var priceProduct = product.querySelector('.item-price').textContent;
            if(product.querySelector('.box__content--size #size') === null) {
                var sizeProduct = 0;
            } else {
                var sizeProduct = product.querySelector('.box__content--size #size').value;
            }
            // 2. Tạo đối tượng từ dữ liệu đang có
            let phuKien = taoDoiTuongPhuKien(imgProduct, nameProduct, priceProduct, sizeProduct, null);
            console.log(phuKien);

            // 3. Đưa sản phẩm vào danh sách
            danhSachPhuKien.push(phuKien);

            // Lưu trữ danh sách sản phẩm xuống local storage
            let jsonDanhSachPhuKien = JSON.stringify(danhSachPhuKien)
            localStorage.setItem('danhSachPhuKien', jsonDanhSachPhuKien);
        }
    }

    // Ghi đè lại nút thêm giỏ hàng với id tương ứng của sản phẩm
    function ghiDeOnclick(viTri) {
        let HTML = '<a onclick="onclickDuaVaoGioHang(\''+ danhSachPhuKien[viTri].id + '\')" class="fas fa-shopping-cart"></a>'
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

function onclickDuaVaoGioHang(idPhuKien) {    

    // Xây dựng hàm tạo nhanh đối tượng item giỏ hàng ==> gioHang.js
    // Lấy danh sách giỏ hàng có trong local storage ra
    var danhSachItemGioHang = layDanhSachItemGioHang();
    var coTonTaiTrongDanhSachItemGioHang = false;

    for(var i = 0; i < danhSachItemGioHang.length; i++) {
        var itemGioHangHienTai = danhSachItemGioHang[i];
        // Nếu tồn tại sản phẩm thì tăng số lượng
        if(itemGioHangHienTai.idPhuKien === idPhuKien) {
            danhSachItemGioHang[i].soLuong++;
            coTonTaiTrongDanhSachItemGioHang = true;
        }
    }
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng thì thêm mới 1 item giỏ hàng, quantity = 1;
    if(coTonTaiTrongDanhSachItemGioHang == false) {
        var itemGioHang = taoDoiTuongItemGioHang(idPhuKien, null, 1);
        danhSachItemGioHang.push(itemGioHang);
    }
    // Lưu trữ lại vào local storage
    luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
    // alert('Thêm sản phẩm thành công!');
    window.location.reload(); 
}

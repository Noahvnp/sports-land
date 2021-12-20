/*
    File: gioHang.js
    @IT lecturer: B1910107	Phan Van Nam
    @updated: Dec-19-2021
*/

/*---------------- JavaScript cho giỏ Item giỏ hàng ----------------*/ 
var keyLocalStorageItemGioHang = 'danhSachItemGioHang';
// Tạo ra đối tượng item giỏ hàng
    // input: idSanPham, SoLuong
    // output: Đối tượng item giỏ hàng
function taoDoiTuongItemGioHang(idPhuKien, idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idPhuKien = idPhuKien;
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}

// Lấy ra toàn bộ item giỏ hàng được lưu trữ trong local storage
function layDanhSachItemGioHang() {
    var danhSachItemGioHang = new Array();
    // Lấy chuỗi json lưu trữ trong local storage
    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGioHang);
    // Chuyển từ json qua danh sách item giỏ hàng
    if(jsonDanhSachItemGioHang != null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
    console.log('item gio hang: '+danhSachItemGioHang);
    return danhSachItemGioHang;
}

function luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang) {
    // Chuyển thành chuỗi json
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);
    // Lưu vào local storage
    localStorage.setItem(keyLocalStorageItemGioHang, jsonDanhSachItemGioHang);
}


function hienThiDanhSachItemGioHang() {
    //Lấy danh sách giỏ hàng trong local storage
    var danhSachItemGioHang = layDanhSachItemGioHang();
    // Lấy element trong file giohang.html để thêm vào sản phẩm
    var nodeGioHang = document.querySelector('.shopping-card');
    // Kiểm tra trong giỏ hàng có sản phẩm nào chưa
    if(danhSachItemGioHang.length === 0) {
        nodeGioHang.innerHTML += '<th class="shopping-card__heading">Giỏ hàng của bạn hiện đang trống.<br><br>Hãy quay lại cửa hàng để tiếp tục mua sắm.</th>';
    } else {
        // Bước 2: chuyển danh sách item giỏ hàng sang htmlTong
        var HTML = chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang);
        // Bước 3: Truy cập node giỏ hàng để hiện thị HTML giỏ hàng lên
        nodeGioHang.innerHTML += HTML;
    }
}


// Chuyển danh sách giỏ hàng thành html
function chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang) {
    var htmlTong = '<thead class="shopping-card__header">\n'+
                    '   <tr>\n'+
                    '     <th colspan="7" class="shopping-card__heading ">Giỏ hàng của bạn</th>\n'+
                    '   </tr>\n'+
                    '   <tr>\n'+
                    '       <th>Hình Ảnh</th>\n'+
                    '       <th>Sản Phẩm</th>\n'+
                    '       <th>Đơn Giá</th>\n'+
                    '       <th>Size</th>\n'+
                    '       <th>Số Lượng</th>\n'+
                    '       <th>Tổng</th>\n'+
                    '       <th>Thao tác</th>           \n'+
                    '     </tr>\n'+
                    '</thead> ';
    for(var i = 0; i < danhSachItemGioHang.length; i++) {
        htmlTong += chuyenDoiTuongItemGioHangSangHTML(danhSachItemGioHang[i]);
    }

    htmlTong += '<tfoot class="shopping-card__footer"><tr><th colspan="5">Tổng số tiền cần thanh toán: </th><th>'+ formatCurrency(tienPhaiTra) +'</th><th>Thanh toán <i class="fas fa-money-check-alt"></i></th></tr></tfoot>';

    return htmlTong;
}
var tienPhaiTra = 0;
// Chuyển 1 sản phẩm thêm vào giỏ hàng bằng html
function chuyenDoiTuongItemGioHangSangHTML(itemGioHang) {
    var html = '';
    if(itemGioHang.idPhuKien !== null) {
        let phuKien = layPhuKienTheoId(itemGioHang.idPhuKien);
        var tongTien = itemGioHang.soLuong * Number(phuKien.price.replace(/[^0-9]/g,""));
        tienPhaiTra += tongTien;

        html = '<tbody class="shopping-card__body">'
                    + '<tr>\n'+
                    '<th style="display: none;">'+ phuKien.id +'</th> \n'+
                    '<th>'+  phuKien.img +'</th>\n'+
                    '<th>' + phuKien.name +'</th>\n'+
                    '<th>' + phuKien.price + '</th>\n'+
                    '<th>' + phuKien.size + '</th>\n'+
                    '<th>' + itemGioHang.soLuong +'</th>\n'+
                    '<th>' + formatCurrency(tongTien) +'</th>\n'+
                    '<th onclick="deleteCart(this)"><i class="far fa-trash-alt"></i></th>\n'+
                ' </tr>' +
                '</tbody>';
    } 
    else if(itemGioHang.idSanPham !== null) {
        let sanPham = laySanPhamTheoId(itemGioHang.idSanPham);
        var tongTien = itemGioHang.soLuong * Number(sanPham.price.replace(/[^0-9]/g,""));
        tienPhaiTra += tongTien;

        html = '<tbody class="shopping-card__body">'
                    + '<tr>\n'+
                    '<th style="display: none;">'+ sanPham.id +'</th> \n'+
                    '<th>'+  sanPham.img +'</th>\n'+
                    '<th>' + sanPham.name +'</th>\n'+
                    '<th>' + sanPham.price + '</th>\n'+
                    '<th>' + sanPham.size + '</th>\n'+
                    '<th>' + itemGioHang.soLuong +'</th>\n'+
                    '<th>' + formatCurrency(tongTien) +'</th>\n'+
                    '<th onclick="deleteCart(this)"><i class="far fa-trash-alt"></i></th>\n'+
                ' </tr>' +
                '</tbody>';
    }  
    return html;
}

function deleteCart(evt){ 
    let updatedCart = [];  
    let custommerCart = JSON.parse(localStorage.getItem(keyLocalStorageItemGioHang)); 
    custommerCart.forEach(itemGioHang => { 
        if(itemGioHang.idSanPham != evt.parentElement.children[0].innerHTML && itemGioHang.idPhuKien != evt.parentElement.children[0].innerHTML)
            updatedCart.push(itemGioHang); 
    }); 

    localStorage.setItem(keyLocalStorageItemGioHang, JSON.stringify(updatedCart)); 
    window.location.reload(); 
}; 

// Từ các item sản phẩm lấy ra các node sau đó tạo đối tượng để lưu trữ vào local storage
function taoDoiTuongPhuKien(imgProduct, nameProduct, priceProduct, sizeProduct, id) {
    let phuKien = new Object();
    // Gán thuộc tính cho đối tưỢng
    phuKien.img = imgProduct;
    phuKien.name = nameProduct; 
    phuKien.price = priceProduct;
    phuKien.size = sizeProduct;
    // Nếu sản phẩm chưa có Id thì tạo mới Id
    if(id != null)
        phuKien.id = id;
    else
        phuKien.id = taoId();

    phuKien.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    // Từ JSON của danh sách sản phẩm trả về một danh sách sản phẩm có đầy đủ các PHƯƠNG THỨC CỦA MỘT ĐỐI TƯỢNG
    phuKien.fromJSONs = function(jsonDanhSachPhuKien) {
        var danhSachPhuKienDayDu = new Array();
        var danhSachPhuKien = JSON.parse(jsonDanhSachPhuKien);

        for(let i = 0; i < danhSachPhuKien.length; i++) {
            let phuKien = danhSachPhuKien[i];
            var phuKienDayDu = 
                taoDoiTuongPhuKien(phuKien.imgProduct, phuKien.nameProduct, phuKien.priceProduct, phuKien.sizeProduct, phuKien.id);
            danhSachPhuKienDayDu[i] = phuKienDayDu;
        }
        return danhSachPhuKienDayDu;
    }

    return phuKien;
}


// Lấy ra sản phẩm với id được truyền vào
function layPhuKienTheoId(idPhuKien) {
    let phuKien = new Object();
    // Lấy danh sách sản phẩm
    var danhSachPhuKien = layDanhSachPhuKienTrongLocalStogare();
    // Duyệt toàn bộ đối tượng kiểm tra xem id của đối tượng có bằng với id truyền vào hay không
    for(let i = 0; i < danhSachPhuKien.length; i++) {
        var PhuKienHienTai = danhSachPhuKien[i];
        if (PhuKienHienTai.id === idPhuKien) {
            phuKien = PhuKienHienTai;
        }
    }
    phuKien = taoDoiTuongPhuKien(phuKien.img, phuKien.name, phuKien.price, phuKien.size, phuKien.id);
    return phuKien;
}

// Lấy danh sách phụ kiện dưới localStorage
function layDanhSachPhuKienTrongLocalStogare() {
    // Lấy danh sách toàn bộ đối tượng
    var jsonDanhSachPhuKien = localStorage.getItem('danhSachPhuKien');
    // Chuyển json thành đối tượng
    var danhSachPhuKien = JSON.parse(jsonDanhSachPhuKien);
    return danhSachPhuKien;
}

// Từ các item sản phẩm lấy ra các node sau đó tạo đối tượng để lưu trữ vào local storage
function taoDoiTuongSanPham(imgProduct, nameProduct, priceProduct, sizeProduct, id) {
    let sanPham = new Object();
    // Gán thuộc tính cho đối tưỢng
    sanPham.img = imgProduct;
    sanPham.name = nameProduct; 
    sanPham.price = priceProduct;
    sanPham.size = sizeProduct;
    // Nếu sản phẩm chưa có Id thì tạo mới Id
    if(id != null)
        sanPham.id = id;
    else
        sanPham.id = taoId();

    sanPham.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    // Từ JSON của danh sách sản phẩm trả về một danh sách sản phẩm có đầy đủ các PHƯƠNG THỨC CỦA MỘT ĐỐI TƯỢNG
    sanPham.fromJSONs = function(jsonDanhSachSanPham) {
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

        for(let i = 0; i < danhSachSanPham.length; i++) {
            let sanPham = danhSachSanPham[i];
            var sanPhamDayDu = 
                taoDoiTuongSanPham(sanPham.imgProduct, sanPham.nameProduct, sanPham.priceProduct, sanPham.sizeProduct, sanPham.id);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }
        return danhSachSanPhamDayDu;
    }

    return sanPham;
}

// Lấy ra sản phẩm với id được truyền vào
function laySanPhamTheoId(idSanPham) {
    let sanPham = new Object();
    // Lấy danh sách sản phẩm
    var danhSachSanPham = layDanhSachSanPhamTrongLocalStogare();
    // Duyệt toàn bộ đối tượng kiểm tra xem id của đối tượng có bằng với id truyền vào hay không
    for(let i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham) {
            sanPham = sanPhamHienTai;
        }
    }
    sanPham = taoDoiTuongSanPham(sanPham.img, sanPham.name, sanPham.price, sanPham.size, sanPham.id);
    return sanPham;
}

// Lấy danh sách sản phẩm dưới localStorage
function layDanhSachSanPhamTrongLocalStogare() {
    // Lấy danh sách toàn bộ đối tượng
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    // Chuyển json thành đối tượng
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    return danhSachSanPham;
}
// Format đơn vị tiền tệ
const formatCurrency = (amount, locale = "vi-VN") => { 
    return new Intl.NumberFormat(locale, { 
        style: 'currency',  
        currency: 'VND', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(amount); 
};

// Hàm sinh ID tự động (ID là duy nhất) ==> hàm có thể trùng ID nhưng xác suất cực thấp.
function taoId() {
    var id = '';
    //Lấy milisecond ở thời điểm hiện tại
    id = Math.random().toString().substring(2,15) + "_" + String(new Date().getTime());
    return id;
}
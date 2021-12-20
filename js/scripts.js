/*
    File: scripts.js
    @IT lecturer: B1910107	Phan Van Nam,
                  B1906383	Nguyen Thanh Loi,
                  B1906770	Thai Nhut Thien
    @updated: Dec-19-2021
*/

//javascript for the responsive navigation menu
var menu = document.querySelector(".nav-bar__items");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});

// //javascript for the header bar effects on scroll
window.addEventListener("scroll", function(){
    var header = document.querySelector(".header");
    header.classList.toggle("sticky-header", window.scrollY > 0);
});

// javascipt search form
var searchForm = document.querySelector('.search-form');
var form = document.querySelector('.header__search-form')
document.querySelector('.search-btn').onclick = () =>{
    form.classList.toggle('active');
}

// jquery for button back to top
$(document).ready(function() {
    $(window).scroll(function(){
        if($(this).scrollTop()) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }  
    });

    $('#back-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 100);
    });
});


/*js trang chủ */
$(() => {
    $('#next').click(function () {
        changeImage('next');
    })
    $('#prev').click(function () {
        changeImage('prev');
    })
})
function changeImage(type){
    let imgSelectVisible = $('img.slider-item:visible');
    let imgVisible = parseInt(imgSelectVisible.attr('number'));
    let eqNumber = type === 'next' ? imgVisible + 1 : imgVisible -1;
    if (imgVisible === -1) {
        eqNumber = $('.slider-item').length -1;
    }
    if (eqNumber >= $('.slider-item').length) {
        eqNumber = 0;
    }
    console.log(eqNumber);
    $('img.slider-item').eq(eqNumber).fadeIn();
        imgSelectVisible.fadeOut();
}



/*-------------Login Register-----------------*/
// Hàm đăng ký
function register(){
    var form = document.querySelector('#form-reg');

    // Kiểm tra có nhập tên không
    if(form.name.value == 0){
        alert('Vui lòng điền tên đăng nhập!');
        form.name.focus();
        return false;
    }

    // Kiểm tra nhập email
    // biểu thức chính quy
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!emailReg.test(form.email.value)){
        alert('Email không hợp lệ!');
        form.name.focus();
        return false;
    }
    // Kiểm tra mật khẩu
    if(form.pw.value.length < 8){
        alert('Mật khẩu phải lớn hơn bằng 8 ký tự!');
        form.pw.focus();
        return false;
    }

    if(form.pwsubmit.value != form.pw.value){
        alert('Mật khẩu không khớp!');
        form.pwsubmit.focus();
        return false;
    }

    alert('Đăng kí thành công!')
    var user = {
        name: form.name.value,
        password: form.pw.value,
        email: form.email.value
    }
    addUser(user);
    return true;
}

// Xây dựng cơ sở dữ liệu giã
if(typeof(Storage) !== 'undefined') {
    
    var accounts = JSON.parse(localStorage.getItem('accounts')) || [{
        name: 'Nguyen Thanh Loi',
        password: '12345678',
        email: 'loi@gmail.com'
    }];
    
}
    localStorage.setItem("accounts", JSON.stringify(accounts));
    function addUser(data){
        const account = {
            name: data.name,
            password: data.password,
            email: data.email,
        }
        accounts.push(account);
        localStorage.setItem("accounts", JSON.stringify(accounts));
}    
function checkAccount(data){
    var accounts = JSON.parse(localStorage.getItem('accounts'));
    const check = accounts.filter(function(account){
        return account.name == data.name && account.password == data.password && account.email == data.email;
    });
    return check.length == 1;
}

function login(){
    var form = document.querySelector('#form-log');
    var user = {
        name: form.name.value,
        email: form.email.value,
        password: form.pw.value
    }

    if(checkAccount(user)){
        alert('Đăng nhập thành công!');
        return true;
    }else{
        alert('Tên đăng nhập, email hoặc password không hợp lệ!');
        return false;
    }
}

// Hàm kiểm tra và hiển thị số lượng sản phẩm trong giỏ hàng
if(localStorage.danhSachItemGioHang != undefined) {  
    const numberOrderedItems = document.querySelector('.cart-btn__quantity');
    var numberOfItems = 0;  
    let custommerCart = JSON.parse(localStorage.getItem('danhSachItemGioHang')); 

    custommerCart.forEach(item => {numberOfItems += item.soLuong; }); 
    numberOrderedItems.innerHTML = numberOfItems; 
} 

// Gán đường dẫn vào giỏ hàng
const shoppingCardBtn = document.querySelector('.header__icons .cart-btn');
shoppingCardBtn.addEventListener("click", function(){  
    location.href = "giohang.html"; 
}); 

// List tab cho trang sản phẩm
const listTab = document.querySelectorAll('.item');
listTab[0].onclick = function(e) {
    changeProductList('trend', this)
}
listTab[1].onclick = function(e) {
    changeProductList('new', this)
}
listTab[2].onclick = function(e) {
    changeProductList('best-sell', this)
}

function changeProductList(type, element) {
    let tabs = document.getElementsByClassName('item');
    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.background = '#DADDFC'
    }
    element.style.background = '#CB3737'

    document.getElementById(type).style.display = 'grid';

    switch (type) {
        case 'trend':
            document.getElementById('new').style.display = 'none';
            document.getElementById('best-sell').style.display = 'none';
            break;
        case 'new':
            document.getElementById('trend').style.display = 'none';
            document.getElementById('best-sell').style.display = 'none';
            break;
        case 'best-sell':
            document.getElementById('trend').style.display = 'none';
            document.getElementById('new').style.display = 'none';
            break;
    }
}
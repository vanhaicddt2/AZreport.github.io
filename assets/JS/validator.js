// Hàm chính Contrutor
function Validator(options){

    // Hàm check và tìm phần tử cha
    function getParent(element,selector){
        while(element.parentElement){
            if (element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRUles = {};

    // hàm thực hiện validator
    function validate(inputElement,rule){
        // var errorElement  
        // var el = document.getElementById(inputElement);
        // console.log(inputElement); 

        var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options. errorSelector);
        var errorMessage;

        // lấy ra các rules của selector
        var rules = selectorRUles[rule.selector];

        // lặp qua từng rule
        // Nếu có lỗi thì dừng việc kiểm.
        for (var i = 0 ; i < rules.length; ++i){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        forrmElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:    
                 errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

            // Tìm element của thẻ span bằng cách tìm thẻ cha.
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement,options.formGroupSelector).classList.add('invalid')  //Tìm đến DOM profile list -> ClassList và thêm class
        } else {
            errorElement.innerText = '';
            getParent(inputElement,options.formGroupSelector).classList.remove('invalid')  //Tìm đến DOM profile list -> ClassList và thêm class
        }

        return ! errorMessage;
    }

    // Lấy element của form cần validator
    var forrmElement = document.querySelector(options.form);

    if (forrmElement){
        
        // Khi submit form.
        forrmElement.onsubmit = function(e) {
            e.preventDefault();
            
            var isFormVlaid = true; 
            
            // lặp qua từng rules và validate
            options.rules.forEach(function(rule) {
              var inputElement = forrmElement.querySelector(rule.selector);
              var isValid =  validate(inputElement,rule);
              if (!isValid){
                  isFormVlaid = false;
                  console.log("Lỗi");
              }
            });


            if (isFormVlaid) {
                // Trường hợp submit với JS
                if (typeof options.onSubmit ==='function') {
                    var enableInputs = forrmElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values,input){

                        switch(input.type){
                            case 'radio':
                                values[input.name] = forrmElement.querySelector('input[name="' + input.name + '"]:checked').value;   // nhận giá trị có checked.
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;                                    
                                }

                                if (!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                } 

                                values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;    
                            default:
                                values[input.name] = input.value;   
                        }
                        return values;
                    },{});

                    var errorElement = document.querySelector(options.errorMessegeForm)

                    if(formValues.fullname == 'admin' && formValues.password == 123456) {
                        Object.assign(errorElement.style,{
                            display: 'none',
                            // textAlign: 'center',
                        });
                        alert('Login Success')

                        options.onSubmit({formValues});
                    } else {
                        // alert('Sai PASS')
                      //  errorMessage = 'wrong password / username';
                        Object.assign(errorElement.style,{
                            display: 'block',
                            textAlign: 'center',
                        });
                    }

                }else {
                    // trường hơp submit với hành động mặc định
                    forrmElement.submit();
                }
            } 
        }

        // Lặp qua mỗi rule và xử lý ( lắng nghe sự kiện blur, input ...)

        options.rules.forEach(function(rule){

            // Lưu lại các rules cho mỗi input

            if (Array.isArray(selectorRUles[rule.selector])){
                // lần 2 sẽ là mảng nên được vào đây.
                selectorRUles[rule.selector].push(rule.test);  // đây rule vào mỗi Selector ví dụ nếu selector có 2 rule thì sẽ đầy vào 2
            } else {
                selectorRUles[rule.selector] = [rule.test]; // lúc k có phần tử -> rỗng
            }


            // var inputElement = forrmElement.querySelector(rule.selector);
            var inputElements = forrmElement.querySelectorAll(rule.selector); // nhận tất cả input
            Array.from(inputElements).forEach(function(inputElement){        // chuyển đổi NodeLisr về dạng Array
                // Xử lý trường hophw blur khỏi input
                inputElement.onblur = function(){
                    validate(inputElement,rule)
                }

                // Xử lý trường hợp mỗi khi người dùng nhập vào input.
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options. errorSelector);

                    errorElement.innerText = '';
                    getParent(inputElement,options.formGroupSelector).classList.remove('invalid') ; 
                }

            });

        });

    }
}

// Định nghĩ rules
// NGuyên tắc của rules.
// 1. Khi có lỗi trả ra message lỗi.
// 2. Khi hợp lệ -> k báo lỗi.

Validator.isRequired = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
};

Validator.isEmail = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
};


Validator.minLength= function(selector,min,message){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined :  message ||`vui lòng nhập tối thiểu ${min} kí tự `;
        }
    };
};

Validator.isConfirmed = function(selector,getConfirmValue,message){
    return {
        selector : selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';  // lấy message mà k dùng mặc định
        }
    }
}


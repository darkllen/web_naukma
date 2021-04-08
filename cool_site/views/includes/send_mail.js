$(function () {
    $('#send_text').submit(function (e) {
        e.preventDefault();

        let data = {
            name: $(this).find('[name=name]').val(),
            surname: $(this).find('[name=surname]').val(),
            email: $(this).find('[name=email]').val(),
            phone: $(this).find('[name=phone]').val(),
            text: $(this).find('[name=text]').val()
        };

        validation_result=valid_form(data);
        console.log(validation_result);
        if (validation_result!='OK'){
            alert(validation_result);
        } else{
            data = JSON.stringify(data);
        
            console.log(data);
            send(data);


            $(this).find('[name=name]').val(''),
            $(this).find('[name=surname]').val(''),
            $(this).find('[name=email]').val(''),
            $(this).find('[name=phone]').val(''),
            $(this).find('[name=text]').val('')
        }


    })
})

function valid_form(dict) {
    if (dict.name=='') return 'Поле з прізвищем або іменем не повинні бути пустим'; 
    if (dict.surname=='') return 'Поле з прізвищем або іменем не повинні бути пустим';
    if (!dict.email.match('[a-zA-Z]+@[a-zA-Z]+')) return 'not valid email';
    if (!dict.phone.match('[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}')) return 'phone incorrect';
    if (dict.text=='') return 'text is empty';
    return 'OK';
}
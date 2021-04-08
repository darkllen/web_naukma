$(function () {
    $('#add_book').submit(function (e) {
        e.preventDefault();

        let data = {
            title: $(this).find('[name=title]').val(),
            title_ukr: $(this).find('[name=title_ukr]').val(),
            short_info: $(this).find('[name=short_info]').val(),
            short_info_ukr: $(this).find('[name=short_info_ukr]').val(),
            full_info: $(this).find('[name=full_info]').val(),
            full_info_ukr: $(this).find('[name=full_info_ukr]').val()
        };

        validation_result=valid_form(data);
        console.log(validation_result);
        if (validation_result!='OK'){
            alert(validation_result);
        } else{
            data = JSON.stringify(data);
        
            console.log(data);
            $.ajax({
                url:'/add_book',
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json')
                },
                success: function (response, status, xhr) {
                },
                final: function (params) {
                }
            })

            $(this).find('[name=title]').val(''),
            $(this).find('[name=title_ukr]').val(''),
            $(this).find('[name=short_info]').val(''),
            $(this).find('[name=short_info_ukr]').val(''),
            $(this).find('[name=full_info]').val('')
            $(this).find('[name=full_info_ukr]').val('')
        }


    })
})

function valid_form(dict) {
    if (dict.title=='' ||
        dict.title_ukr=='' ||
        dict.short_info=='' ||
        dict.short_info_ukr=='' ||
        dict.full_info=='' ||
        dict.full_info_ukr=='') return 'all fields shouldn`t be empty'; 
    return 'OK';
}


function delete_request(id) {
    var xhr = new XMLHttpRequest();
    var url = "/delete_request";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({'id':id});
    xhr.send(data);
    document.location.reload();
}

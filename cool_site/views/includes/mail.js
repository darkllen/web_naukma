function send(data, message) {
    alert('Need email confirmation')
    $.ajax({
        url:'/send_mail',
        type: 'POST',
        dataType: 'json',
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
        },
        success: function (response, status, xhr) {
        }
    })
    
}


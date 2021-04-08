function send(data) {
    alert('Confirmed')
    $.ajax({
        url:'/send_text',
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
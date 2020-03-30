var BillGenerate = {
    init: function () {
        $("#errID").addClass('hide');
        $('#nameErr').addClass('hide');
        $('#amtErr').addClass('hide');
        $('#csErr').addClass('hide');
        $('#name').val("");
        $('#amt').val("");
        $('input[name="csType"]').prop('checked', false);
        $('#billamt').val("");
        //$('#nxtBill').addClass('hide');
        $('#calcu').removeClass('hide');
        var arr = ["ABC", "Enterprise"]
        $("#nxtBill").on("click", function () {
            $("#errID").addClass('hide');
            $('#nameErr').addClass('hide');
            $('#amtErr').addClass('hide');
            $('#csErr').addClass('hide');
            $('#name').val("");
            $('#amt').val("");
            $('input[name="csType"]').prop('checked', false);
            $('#billamt').val("");
            $('#nxtBill').addClass('hide');
            $('#calcu').removeClass('hide');
        });
        $("#amt").keypress(function (e) {
            
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
               
                $("#errmsg").html("Digits Only").show().fadeOut("slow");
                return false;
            }
        });
        $("#calcu").on("click", function () {
            //e.preventDefault();
            debugger;
            var error = false;
            if ($('#name').val().length < 1 && $('#amt').val().length < 1 && !($('.radChk').is(':checked'))) {
                $('#nameErr').removeClass('hide');
                $('#amtErr').removeClass('hide');
                $('#csErr').removeClass('hide');
                error = true;
            }
            if ($('#name').val().length < 1) {
                $('#nameErr').removeClass('hide');
                error = true;
            }
            if ($('#amt').val().length < 1) {
                $('#amtErr').removeClass('hide');
                error = true;
            }
            if (!($('.radChk').is(':checked'))) {
                $('#csErr').removeClass('hide');
                error = true;
            }
            if (error == false) {
                BillGenerate.CalculateBill();
            }
            else {
                $("#errID").removeClass('hide');
            }

           
        });
        
    },
    CalculateBill: function () {
        debugger;
        $("#errID").addClass('hide');
        $('#nameErr').addClass('hide');
        $('#amtErr').addClass('hide');
        $('#csErr').addClass('hide');
            var param = {
                Name: $('#name').val(),
                CustType: $("input[name='csType']:checked").val(),
                Bill: $('#amt').val(),
                
            };
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/Home/CalculateDiscount",
                data: JSON.stringify(param),
                dataType: "json"
            }).done(function (data) {
                if (data.Status == true) {
                    debugger;
                    $('#name').val(data.suggestedAddress.Name);
                    $('#amt').val(data.suggestedAddress.BillAmt);
                    $('#billamt').val(data.suggestedAddress.FinalAmt);
                    var radChk = data.suggestedAddress.CustType;
                    if (radChk == "regula") {
                        $("#regCst").prop("checked", true);
                    }
                    else {
                        $("#preCst").prop("checked", true);
                    }
                    $('#nxtBill').removeClass('hide');
                    $('#calcu').addClass('hide');

                }

            }).fail(function () {
                $("#errID").removeClass('hide');
            }).always(function () {
                //$('#LoadingPanel').hide();
            });


        },
    

}

var $ = function(id)
{
    return document.getElementById(id);
};

var validateAndSubmit = function(evt)
{
    //prevent default call of submit()
    evt.preventDefault();

    //validate
    let isValid = true;

    //validate currency type selection
    if (!$("bitcoin").checked && !$("ethereum").checked)
    {
        isValid = false;
        $("typeError").style.display = "block";
    }
    else
    {
        if ($("typeError").hasAttribute("style"))
        {
            $("typeError").removeAttribute("style");
        }
    }

    //validate wallet type selection
    if (!$("hardware").checked && !$("web").checked)
    {
        isValid = false;
        $("walletError").style.display = "block";
    }
    else
    {
        if ($("walletError").hasAttribute("style"))
        {
            $("walletError").removeAttribute("style");
        }
    }

    //validate all Customer Info fields are not empty
    let custInfoFields = $("customerInfo").getElementsByClassName("form-control");
    let isCustInfoValid = true;
    for (x of custInfoFields)
    {
        if (x.value == "")
        {
            isCustInfoValid = false;
        }
    }
    //validate email
    if ($("email").value != $("confirmEmail").value)
    {
        isCustInfoValid = false;
    }

    if (!isCustInfoValid)
    {
        isValid = false;
        $("customerError").style.display = "block";
    }
    else
    {
        if ($("customerError").hasAttribute("style"))
        {
            $("customerError").removeAttribute("style");
        }
    }

    //validate all Billing Info fields are not empty
    if (!$("same").checked)
    {
        let billInfoFields = $("billingInfo").getElementsByClassName("form-control");
        let isBillInfoValid = true;
        for (x of billInfoFields)
        {
            if (x.value == "")
            {
                isBillInfoValid = false;
            }
        }
        if (!isBillInfoValid)
        {
            isValid = false;
            $("billingError").style.display = "block";
        }
        else
        {
            if ($("billingError").hasAttribute("style"))
            {
                $("billingError").removeAttribute("style");
            }
        }
    }
    else
    {
        if ($("billingError").hasAttribute("style"))
        {
            $("billingError").removeAttribute("style");
        }
    }

    if (!isValid)
    {
        $("masterError").style.display = "block";
    }
    else
    {
        sameBilling();
        document.getElementsByClassName("form")[0].submit();
    }
};

var sameBilling = function() {
    let billInfoFields = $("billingInfo").getElementsByClassName("form-control");
    for (x of billInfoFields)
    {
        x.disabled = this.checked;
        if (!this.checked)
        {
            x.value = "";
        }
    }
    updateBilling();
};

var updateBilling = function() {
    if ($("same").checked)
    {
        $("billingFirstName").value = $("firstName").value;
        $("billingLastName").value = $("lastName").value;
        $("billingAddress").value = $("address").value;
        $("billingZip").value = $("zip").value;
        $("billingPhone").value = $("phone").value;
    }
};

window.onload = function()
{
    $("submitButton").onclick = validateAndSubmit;
    $("same").onclick = sameBilling;
    $("firstName").onchange = updateBilling;
    $("lastName").onchange = updateBilling;
    $("address").onchange = updateBilling;
    $("zip").onchange = updateBilling;
    $("phone").onchange = updateBilling;
};
using Shop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shop.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CalculateDiscount(string Name, string CustType, string Bill, InputModel model)
        {
            var bill = Convert.ToInt32(Bill);
            var orgBill = bill;
            var TotalDis = 0;
            bool result=true;
            
            var DisBill = 0;
            if (CustType == "regula")
            {
                if (bill <= 5000)
                {
                    TotalDis = 0;
                }
                else if (bill >= 5001 && bill <= 10000)
                {
                    TotalDis = (5000 * 10) / 100;

                }
                else if (bill >= 10001)
                {
                    bill = bill - 10000;
                    TotalDis = 500 + (bill * 20) / 100;
                }
                else
                {
                    result = false;
                }
                if(result)
                {
                    DisBill = orgBill - TotalDis;
                    model.Name = Name;
                    model.BillAmt = orgBill;
                    model.CustType = CustType;
                    model.FinalAmt = DisBill;
                    return Json(new { Status = result, suggestedAddress = model });

                }
                
            }
            else
            {
                if (bill <= 4000)
                {
                    TotalDis += ((4000 - 0) * 10) / 100;
                }
                else if (bill >= 4001 && bill <= 8000)
                {
                    TotalDis = 400 + ((8000 - 4000) * 15) / 100;

                }
                else if (bill >= 8001 && bill <= 12000)
                {

                    TotalDis = 1000 + ((12000 - 8000) * 20) / 100;

                }
                else if (bill >= 12001)
                {

                    TotalDis = 1800 + ((bill - 12000) * 30) / 100;

                }
                else
                {
                    result = false;
                }

                if (result)
                {
                    DisBill = orgBill - TotalDis;
                    model.Name = Name;
                    model.BillAmt = bill;
                    model.CustType = CustType;
                    model.FinalAmt = DisBill;
                    return Json(new { Status = result, suggestedAddress = model });

                }
            }
            return Json(new { Status = result });

        }
    }
}
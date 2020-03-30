using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Models
{
    public class InputModel
    {
        public string CustType { get; set; }
        public string Name { get; set; }
        public int BillAmt { get; set; }
        public int FinalAmt{ get; set; }
    }
}
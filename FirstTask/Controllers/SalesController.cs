using FirstTask.DataContext;
using FirstTask.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly EFContext _eFContext;
        public SalesController(EFContext eFContext)
        {
            _eFContext = eFContext;
        }


        [HttpGet]
        [Route("GetSales")]
        public IActionResult GetSales()
        {
            var data = from s in _eFContext.Sale1
                       join c in _eFContext.Customer1
                       on s.CustomerID equals c.CusID
                       join p in _eFContext.Product1
                       on s.ProductID equals p.ProdId
                       join st in _eFContext.Store1
                       on s.StoreID equals st.StorId
                       select new
                       {
                           sales = s.SalesId,
                           CustomerID = c.CusID,
                           Customer = c.CusName,
                           ProductID = p.ProdId,
                           Product = p.ProdName,
                           StoreID = st.StorId,
                           Store = st.StorName,
                           DateSold = s.DateSold
                       };

            return Ok(data.ToList());

        }

        [HttpGet]
        [Route("GetSalesID/{id}")]
        public IActionResult GetSalesID(int id)
        {
            var data = from s in _eFContext.Sale1.Where(s => s.SalesId == id)
                       join c in _eFContext.Customer1
                       on s.CustomerID equals c.CusID
                       join p in _eFContext.Product1
                       on s.ProductID equals p.ProdId
                       join st in _eFContext.Store1
                       on s.StoreID equals st.StorId
                       select new
                       {
                           sales = s.SalesId,
                           CustomerID = c.CusID,
                           Customer = c.CusName,
                           ProductID = p.ProdId,
                           Product = p.ProdName,
                           StoreID = st.StorId,
                           Store = st.StorName,
                           DateSold = s.DateSold
                       };
            try
            {
                if (data == null)
                {
                    return BadRequest("Invalid Id");
                }
                else
                {
                    return Ok(data);
                }
            }
            catch(Exception e)
            {
                return Ok(e);
            }

        }


        [HttpPost]
        [Route("PostSale")]
        public IActionResult PostSale(Sales sales)
        {
            var data = new Sales()
            {
                CustomerID = sales.CustomerID,
                ProductID = sales.ProductID,
                StoreID = sales.StoreID,
                DateSold = sales.DateSold,

            };
            try
            {
                if (data == null)
                {
                    return BadRequest("Invalid Input");
                }
                else
                {
                    _eFContext.Sale1.Add(data);
                    _eFContext.SaveChanges();
                    return Ok("New Sale Added Successfully!!");
                }
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        [HttpPut]
        [Route("UpdateSales/{id}")]
        public IActionResult UpdateSales(int id,Sales sales)
        {
            var data = _eFContext.Sale1.FirstOrDefault(s => s.SalesId == id);

            try
            {
                if (data == null)
                {
                    return BadRequest("Not Valid Input");
                }
                else
                {
                    _eFContext.Sale1.Update(data);

                    data.CustomerID = sales.CustomerID;
                    data.ProductID=sales.ProductID;
                    data.StoreID = sales.StoreID;
                    data.DateSold = sales.DateSold;


                    _eFContext.SaveChanges();
                    return Ok("Updated Sales Successfully");

                }
            }
            catch(Exception e)
            {
                return Ok(e);

            }

        }
        [HttpDelete]
        [Route("DeleteSales/{id}")]
        public IActionResult DeleteSales(int id)
        {
            var data = _eFContext.Sale1.FirstOrDefault(s => s.SalesId == id);

            try
            {
                if (data == null)
                {
                    return BadRequest("No ID Found");
                }
                else
                {
                    _eFContext.Sale1.Remove(data);
                    _eFContext.SaveChanges();
                    return Ok("Deleted Sales Successfully");
                }
            }
            catch(Exception e)
            {
                return Ok(e);
            }
        }
    }
}
using FirstTask.DataContext;
using FirstTask.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly EFContext _eFContext;

        public CustomerController(EFContext eFContext)
        {
            _eFContext=eFContext;
        }
        [HttpGet]
        [Route("GetCustomer")]

        public IActionResult GetCustomer()
        {
            var data = _eFContext.Customer1.ToList();
            return Ok(data);


        }

        [HttpGet]
        [Route("GetCustomerID/{id}")]

        public IActionResult GetCustomerID(int id)
        {
            var data = _eFContext.Customer1.FirstOrDefault(s => s.CusID == id);

            if(data==null)
            {
                return BadRequest("Please Enter Valid ID");
            }
            else
            {
               return Ok(data);

            }
        }


        [HttpPost]
        [Route("PostCustomer")]
        public IActionResult PostCustomer(Customer customer)
        {

            var data = new Customer()
            {
                
                CusName = customer.CusName,
                Address = customer.Address
            };
            _eFContext.Customer1.Add(data);
            _eFContext.SaveChanges();
            if (data==null)
            {
                return BadRequest("Not a valid Request");

            }
            else
            {
                return Ok( "New Customer Added Successfully");

            }
            
        }
        [HttpPut]
        [Route("UpdateCustomer/{id}")]

        public IActionResult UpdateCustomer(int id, Customer customer)
        {
            var data=_eFContext.Customer1.FirstOrDefault(s=>s.CusID==id);
            if (data==null)
            {
                return BadRequest("Please Provide Correct ID");
            }
            else
            {

                _eFContext.Customer1.Update(data);
               
                data.CusName = customer.CusName;
                data.Address = customer.Address;
                _eFContext.SaveChanges();
                return Ok("Data Updated Successfully");

            }

         

        }

        [HttpDelete]
        [Route("DeleteCustomer/{id}")]

        public IActionResult DeleteCustomer(int id )
        {
            var data = _eFContext.Customer1.FirstOrDefault(s => s.CusID == id);
            if(data==null)
            {
                return BadRequest("No ID Found");
            }
            else
            {
                _eFContext.Customer1.Remove(data);
                _eFContext.SaveChanges();

                return Ok("Data Successfully Deleted");
            }

            

        }
    }
     
}

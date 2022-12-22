using FirstTask.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using FirstTask.Model;

namespace FirstTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EFContext _eFContext;
        public ProductController(EFContext eFContext)
        {
            _eFContext = eFContext;
        }


        [HttpGet]
        [Route("GetProduct")]

        public IActionResult GetProduct()
        {

            var data = _eFContext.Product1.ToList();

            return Ok(data);

        }

        [HttpGet]
        [Route("GetProductId/{id}")]
        public IActionResult GetProductId(int id)
        {
            var data = _eFContext.Product1.FirstOrDefault(p => p.ProdId == id);

            if (data == null)
            {
                return BadRequest("Not Found");
            }
            else
            {

                return Ok (data);
            }
        }

        [HttpPost]
        [Route("PostProduct")]

        public IActionResult PostProduct(Product product)
        {

            var data = new Product()
            {
                ProdName = product.ProdName,
                Price = product.Price
            };

            try
            {
                if (data == null)
                {
                    return BadRequest("Not Valid Request");
                }
                else
                {
                    _eFContext.Product1.Add(data);
                    _eFContext.SaveChanges();
                    return Ok("New Product Added!!");
                }
            }

            catch (Exception Error)
            {
                return Ok(Error);
            }

        }

        [HttpPut]
        [Route("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(int id,Product product)
        {
            var data = _eFContext.Product1.FirstOrDefault(p => p.ProdId == id);

            try
            {
                if(data==null)
                {
                    return NotFound();
                }
                else
                {

                   
                    _eFContext.Product1.Update(data);
                    data.ProdName = product.ProdName;
                    data.Price = product.Price;
                    _eFContext.SaveChanges();
                    return Ok("New Product Updated Successfully");
                }
            }
            catch(Exception Error)
            {
                return Ok(Error);
            }


            

        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var data = _eFContext.Product1.FirstOrDefault(p => p.ProdId == id);

            try
            {
                if(data==null)
                {
                    return BadRequest("Not Found");
                }
                else
                {
                    _eFContext.Product1.Remove(data);
                    _eFContext.SaveChanges();
                    return Ok("Delted Product Successfully");
                }
            }
            catch(Exception error)
            {
                return Ok(error);
            }
        }
    }       

    }


   
    




using FirstTask.DataContext;
using FirstTask.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FirstTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly EFContext _eFContext;
        public StoreController(EFContext eFContext)

        {
            _eFContext = eFContext;

        }

        [HttpGet]
        [Route("GetStore")]
        public IActionResult GetStore()
        {

            var data = _eFContext.Store1.ToList();
            
            return Ok(data);
        }

        [HttpGet]
        [Route("GetStoreId/{id}")]

        public IActionResult GetStoreId(int id)
        {
            var data = _eFContext.Store1.FirstOrDefault(s => s.StorId == id);

            if (data == null)
            {
                return BadRequest("Not Found");
            }
            else
            {
                return Ok(data);

            }
        }

        [HttpPost]
        [Route("PostStore")]
        public IActionResult PostStore(Store store)
        {
            var data = new Store()
            {
                StorName=store.StorName,
                StorAddress=store.StorAddress,
            };

            try
            {
                if (data == null)
                {
                    return BadRequest("sorry invalid input");
                }
                else
                {
                    _eFContext.Store1.Add(data);
                    _eFContext.SaveChanges();
                    return Ok("New Store Added Successfully!!");
                }

            }
            catch(Exception e)
            {
                return Ok(e);
            }

            

            
        }
        [HttpPut]
        [Route("UpdateStore/{id}")]

        public IActionResult UpdateStore(int id,Store store)
        {

            var data = _eFContext.Store1.FirstOrDefault(s => s.StorId == id);

            try
            {
                if (data == null)
                {
                    return BadRequest("invalid Input");
                }
                else
                {
                    _eFContext.Store1.Update(data);
                    data.StorName = store.StorName;
                    data.StorAddress = store.StorAddress;
                    _eFContext.SaveChanges();
                    return Ok("Store Updated Successfully");

                }
            }
            catch(Exception e)
            {
                return Ok(e);

            }
           

        }
        [HttpDelete]
        [Route("DeleteStore/{id}")]
        public IActionResult DeleteStore(int id)
        {
            var data = _eFContext.Store1.FirstOrDefault(s => s.StorId == id);

            try
            {
                if (data == null)
                {
                    return BadRequest("Not Found");
                }
                else
                {
                    _eFContext.Store1.Remove(data);
                    _eFContext.SaveChanges();
                    return Ok("Deleted Store Successfully");
                }
            }
            catch(Exception e)
            {
                return Ok(e);
            }
        }


    }
}

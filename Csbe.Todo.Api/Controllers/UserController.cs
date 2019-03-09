using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Csbe.Todo.Api.Models;
using Csbe.Todo.Api.Services;
using Csbe.Todo.Api.DataAccess;
using System.Security.Cryptography;
using System;
using System.Text;

namespace Csbe.Todo.Api.Controllers
{
    [Route("api/User")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly TodoContext _todoContext;
        
        public UserController(TodoContext context)
        {
            _todoContext = context;
        }
        //GET: api/todoitem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _todoContext.Users.ToListAsync();
        }
        //GET: api/todoitem/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _todoContext.Users.FindAsync(id);
            if(user == null) return NotFound();
            return user;
            
        }
        //POST: api/todoitem
        [HttpPost]
        public async Task<ActionResult<User>> CreateUsers(User user)
        {
            var UserFound = _todoContext.Users.FirstOrDefault(x => x.Name == user.Name && x.Email == user.Email);
            if(UserFound != null)
            {
                return StatusCode(409);
            }
            else
            {

                /*byte[] pw = SecurityService.HashPassword(user.PwHash);
                byte[] salt = SecurityService.GetSalt();
                byte[] rv = new byte[pw.Length + salt.Length]; */
                
                user.PwHash = SecurityService.HashPasswordwithSalt(user.PwHash);
                _todoContext.Users.Add(user);
                await _todoContext.SaveChangesAsync();
                
            }

            return CreatedAtAction("ReadUserById", new {id = user.Id}, user);
        }
        [HttpPost("authenticate")]
        public IActionResult AuthenticateUser(User user)
        {
            var storedpw = _todoContext.Users.FirstOrDefault(x => x.Username == user.Username).PwHash;
            var pw = SecurityService.HashPasswordwithSalt(user.PwHash);
            if(SecurityService.CanAuthenticate(pw,storedpw)){
                return StatusCode(200);
            }else {
                return StatusCode(403);
            }              
        }
        //PUT: api/todoitem/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(long id, User user)
        {
            if(id != user.Id) return NotFound();
            _todoContext.Entry(user).State = EntityState.Modified;
            try
            {
                await _todoContext.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                return NotFound();
            }
            return NoContent();
        }
        //DELETE: api/todoitem/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(long id)
        {
            var user = await _todoContext.Users.FindAsync(id);
            if(user == null) return NotFound();

            _todoContext.Users.Remove(user);
            await _todoContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
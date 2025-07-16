using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController(JobContext context) : ControllerBase
    {
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            return Ok(await context.Jobs.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobStatus(string id, Job job)
        {
            try
            {
                var existingJob = await context.Jobs.FindAsync(id);
                if (existingJob == null) return NotFound($"Job with id {id} not found");

                context.Entry(existingJob).CurrentValues.SetValues(job);

                await context.SaveChangesAsync();

                return Ok(existingJob);
            }
            catch (Exception ex)
            {
               Console.WriteLine($"Error updating job {id}: {ex.Message}");
               return StatusCode(500, "An error occured while updating the job");
            }
        }
    }
}
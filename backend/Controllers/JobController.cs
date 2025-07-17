using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
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

        [HttpPut("{id}/update")]
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

        [HttpPost("update-all")]
        public async Task<IActionResult> RunScraper()
        {
            try
            {
                var process = Process.Start("job-scraper");
                await process.WaitForExitAsync();
                return Ok();
            }
            catch (Exception ex)
            {
               Console.WriteLine($"Error running database update: {ex.Message}"); 
               return StatusCode(500, "An error occured while running the refresh");
            }
        }

        [HttpPost("test")]
        public async Task<IActionResult> TestProcess()
        {
            try
            {
                await Task.Delay(5000); // 5 seconds
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error running test delay: {ex.Message}");
                return StatusCode(500, "An error occured while running the test delay");
            }
        }
    }
}
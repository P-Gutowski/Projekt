using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using YoutubeClone.Data;
using YoutubeClone.Models;

namespace YoutubeClone.Controllers
{
    public class MoviesController : Controller
    {
        private readonly MovieDbContext _context;

        public MoviesController(MovieDbContext context)
        {
            _context = context;
        }

        // GET: Movies
        public async Task<IActionResult> Index()
        {
              return View(await _context.Movies.ToListAsync());
        }

        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Movies == null)
            {
                return NotFound();
            }

            Movie? movie = await _context.Movies
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // GET: Movies/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,FilePath,CreatedAt,ModifiedAt")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                _context.Add(movie);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Movies == null)
            {
                return NotFound();
            }

            Movie? movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,SourceFileName")] Movie movie)
        {
            if (id != movie.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(movie);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MovieExists(movie.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(movie);
        }

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Movies == null)
            {
                return NotFound();
            }

            Movie? movie = await _context.Movies
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Movies == null)
            {
                return Problem("Entity set 'MovieDbContext.Movies'  is null.");
            }
            Movie? movie = await _context.Movies.FindAsync(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // Streams Video file via API
        // GET: Movies/StreamVideoFile/5
        public async Task<ActionResult<HttpResponseMessage>> StreamVideoFile(int id)
        {
            Response.ContentType = new MediaTypeHeaderValue("application/octet-stream").ToString();

            Movie? movie = await _context.Movies.FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            string filename = movie.SourceFileName;
            string basePath = @"C:\temp\YoutubeCloneVideos\";
            string fullFilePath = $"{basePath}{filename}";

            MemoryStream memory = new();

            using (FileStream file = new(fullFilePath + ".mp4", FileMode.Open,
                FileAccess.Read, FileShare.Read))
            {
                await file.CopyToAsync(memory);
            }

            memory.Position = 0;

            return File(memory, "video/mp4", filename);
        }

        // Streams test Video file via API
        // GET: Movies/StreamTestVideoFile
        public async Task<ActionResult<HttpResponseMessage>> StreamTestVideoFile()
        {
            string filename = "Vines we will never forget";
            string basePath = @"C:\temp\YoutubeCloneVideos\";
            string fullFilePath = $"{basePath}{filename}";

            MemoryStream memory = new();

            using (FileStream file = new(fullFilePath + ".mp4", FileMode.Open,
                FileAccess.Read, FileShare.Read))
            {
                await file.CopyToAsync(memory);
            }

            memory.Position = 0;

            return File(memory, "video/mp4", filename);
        }

        // POST: Movies/Upload
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile formFile)
        {
            long fileSize = formFile.Length;
            if (fileSize <= 0)
            {
                return Ok(new 
                {
                    message = "The file has not been saved. Weight 0.",
                    size = fileSize
                });
            }

            string dt = DateTime.Now.ToString("yyyy-MM-dd.HH.mm.ss.fff");
            string randomSuffix = new Random().NextInt64().ToString();
            string filename = $"File_{dt}_{randomSuffix}";
            string basePath = @"C:\temp\YoutubeCloneVideos\";
            string fullFilePath = $"{basePath}{filename}.mp4";

            using (var stream = System.IO.File.Create(fullFilePath))
            {
                await formFile.CopyToAsync(stream);
            }

            return Ok(new 
            {
                message = "The file has been saved.",
                size = fileSize,
                fileName = filename
            });
        }

        private bool MovieExists(int id)
        {
          return _context.Movies.Any(e => e.ID == id);
        }
    }
}

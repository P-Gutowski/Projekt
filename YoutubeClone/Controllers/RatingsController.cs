using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using YoutubeClone.Data;
using YoutubeClone.Models;

namespace YoutubeClone.Controllers
{
    public class RatingsController : Controller
    {
        private readonly MovieDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RatingsController(UserManager<ApplicationUser> userManager, MovieDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        // GET: Ratings
        public async Task<IActionResult> Index()
        {
              return Ok(await _context.Ratings.ToListAsync());
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Ratings == null)
            {
                return NotFound();
            }

            Rating? rating = await _context.Ratings
                .FirstOrDefaultAsync(m => m.ID == id);
            if (rating == null)
            {
                return NotFound();
            }

            return Ok(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return Ok();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Value")] Rating rating)
        {
            DateTime now = DateTime.Now;
            rating.ModifiedAt = now;
            rating.CreatedAt = now;

            rating.Owner = await _userManager.GetUserAsync(HttpContext.User);

            if (ModelState.IsValid)
            {
                _context.Add(rating);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(rating);
        }
        [HttpGet]
        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Ratings == null)
            {
                return NotFound();
            }

            Rating? rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Value")] Rating rating)
        {
            DateTime now = DateTime.Now;
            rating.ModifiedAt = now;
            rating.CreatedAt = now;
            if (id != rating.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(rating);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RatingExists(rating.ID))
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
            return Ok(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Ratings == null)
            {
                return NotFound();
            }

            Rating? rating = await _context.Ratings
                .FirstOrDefaultAsync(m => m.ID == id);
            if (rating == null)
            {
                return NotFound();
            }
            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();
            return Ok(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Ratings == null)
            {
                return Problem("Entity set 'MovieDbContext.Ratings'  is null.");
            }
            Rating? rating = await _context.Ratings.FindAsync(id);
            if (rating != null)
            {
                _context.Ratings.Remove(rating);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RatingExists(int id)
        {
          return _context.Ratings.Any(e => e.ID == id);
        }
    }
}

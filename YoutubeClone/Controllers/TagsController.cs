﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Data;
using YoutubeClone.Models;

namespace YoutubeClone.Controllers
{
    public class TagsController : Controller
    {
        private readonly MovieDbContext _context;

        public TagsController(MovieDbContext context)
        {
            _context = context;
        }

        // GET: Tags
        public async Task<IActionResult> Index()
        {
              return Ok(await _context.Tags.ToListAsync());
        }

        // GET: Tags/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Tags == null)
            {
                return NotFound();
            }

            Tag? tag = await _context.Tags
                .FirstOrDefaultAsync(m => m.ID == id);
            if (tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }

        // GET: Tags/Create
        public IActionResult Create()
        {
            return Ok();
        }

        // POST: Tags/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Content")] Tag tag)
        {
            DateTime now = DateTime.Now;
            tag.ModifiedAt = now;
            tag.CreatedAt = now;
            if (ModelState.IsValid)
            {
                _context.Add(tag);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(tag);
        }

        // GET: Tags/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Tags == null)
            {
                return NotFound();
            }

            Tag? tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        // POST: Tags/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Content")] Tag tag)
        {
            DateTime now = DateTime.Now;
            tag.ModifiedAt = now;
            tag.CreatedAt = now;
            if (id != tag.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tag);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TagExists(tag.ID))
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
            return Ok(tag);
        }

        // GET: Tags/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Tags == null)
            {
                return NotFound();
            }

            Tag? tag = await _context.Tags
                .FirstOrDefaultAsync(m => m.ID == id);
            if (tag == null)
            {
                return NotFound();
            }
            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
            return Ok(tag);
        }

        // POST: Tags/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Tags == null)
            {
                return Problem("Entity set 'MovieDbContext.Tags'  is null.");
            }
            Tag? tag = await _context.Tags.FindAsync(id);
            if (tag != null)
            {
                _context.Tags.Remove(tag);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TagExists(int id)
        {
          return _context.Tags.Any(e => e.ID == id);
        }
    }
}

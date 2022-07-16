﻿using System;
//using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TDIC.Models.EDM;

namespace TDIC.Controllers
{
    [Authorize]
    public class t_assemblyController : Controller
    {
        private readonly db_data_coreContext _context;

        public t_assemblyController(db_data_coreContext context)
        {
            _context = context;
        }

        // GET: t_assembly
        public async Task<IActionResult> Index()
        {
            return View(await _context.t_assemblies.ToListAsync());
        }

        // GET: t_assembly/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var t_assembly = await _context.t_assemblies
                .FirstOrDefaultAsync(m => m.id_assy == id);
            if (t_assembly == null)
            {
                return NotFound();
            }

            return View(t_assembly);
        }

        // GET: t_assembly/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: t_assembly/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_assy,assy_name")] t_assembly t_assembly)
        {
            //if (ModelState.IsValid)
            try
            {
                long id = 1 + (await _context.t_assemblies
                                        .MaxAsync(t => (long?)t.id_assy) ?? 0);

                t_assembly.id_assy = id;

                _context.Add(t_assembly);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch(Exception e)
            {

#if DEBUG
                TempData["ResultMsg"] = e.Message;
#endif
            }
            return View(t_assembly);
        }

        // GET: t_assembly/Edit/5
        public async Task<IActionResult> Edit(long? id_assy)
        {
            if (id_assy == null)
            {
                return NotFound();
            }

            var t_assembly = await _context.t_assemblies.FindAsync(id_assy);
            if (t_assembly == null)
            {
                return NotFound();
            }
            return View(t_assembly);
        }

        // POST: t_assembly/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("id_assy,assy_name")] t_assembly t_assembly)
        {
            /*
            if (id != t_assembly.id_assy)
            {
                return NotFound();
            }*/

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(t_assembly);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!t_assemblyExists(t_assembly.id_assy))
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
            return View(t_assembly);
        }

        // GET: t_assembly/Delete/5
        public async Task<IActionResult> Delete(long? id_assy)
        {
            if (id_assy == null)
            {
                return NotFound();
            }

            var t_assembly = await _context.t_assemblies
                .FirstOrDefaultAsync(m => m.id_assy == id_assy);
            if (t_assembly == null)
            {
                return NotFound();
            }

            return View(t_assembly);
        }

        // POST: t_assembly/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id_assy)
        {
            var t_assembly = await _context.t_assemblies.FindAsync(id_assy);
            _context.t_assemblies.Remove(t_assembly);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool t_assemblyExists(long id)
        {
            return _context.t_assemblies.Any(e => e.id_assy == id);
        }
    }
}

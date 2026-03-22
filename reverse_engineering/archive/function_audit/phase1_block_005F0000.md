# Block 005F0000 Analysis

Address range: 0x005F0056 - 0x005FFFFE
Total functions: 346
Block character: **CRT library + MFC/OLE framework + Smeds32 DDControl engine**

This block is entirely framework code. No game-logic functions exist here. The block contains:
1. **Smeds32 DDControl** (MicroProse in-house DirectDraw control library) -- ~80 functions at 005F0056-005F1B50
2. **MSVC CRT** (Visual Studio 1998 Debug library) -- ~246 Ghidra-identified library functions
3. **C++ EH** (exception handling) -- ~20 functions
4. Remaining ~20 unlabeled functions are CRT helper stubs (strcpy, strcat, srand, etc.)

---

### Cluster: Smeds32 DDControl (DirectDraw UI Control Framework)

Source file: `D:\Ss\Smeds32\ddcntrl.cpp` (confirmed by assert strings at lines 1204, 1343).
These implement a DirectDraw-based UI control system used by MicroProse games. The class manages a linked list of child controls, dispatches Windows messages (WM_MOUSEMOVE=0x200, WM_LBUTTONDOWN=0x201, etc.) via vtable callbacks, and tracks mouse hover/focus state.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F0056 | stub | FUN_005f0056 | ddctrl_invalidate_surface | 0 (thiscall) | void | Calls surface lock (005ef65a), marks dirty flag [0x2e]=1 | MEDIUM |
| 005F00B8 | small | FUN_005f00b8 | ddctrl_resize_and_repaint | 0 (thiscall) | void | SetRect from surface dims, lock surface, check bounds, repaint children | MEDIUM |
| 005F0169 | stub | FUN_005f0169 | ddctrl_forward_input | 3 | byte | Forwards input event via 005ef4e3, then repaints | MEDIUM |
| 005F01AD | stub | FUN_005f01ad | ddctrl_set_dirty_flag | 1(int) | void | Sets field [0x2b]=param, conditionally marks surface dirty | MEDIUM |
| 005F0213 | stub | FUN_005f0213 | ddctrl_blit_surface | 0 (thiscall) | void | SetRect, calls surface blit (005e8f4b, 005e635f) | MEDIUM |
| 005F0266 | stub | FUN_005f0266 | ddctrl_add_child_tail | 1 | void | Calls list_move_to_tail + list_append | MEDIUM |
| 005F029E | stub | FUN_005f029e | ddctrl_remove_all_children | 0 (thiscall) | void | Iterates list calling remove_current | MEDIUM |
| 005F02F3 | stub | FUN_005f02f3 | ddctrl_update_bounds_all | 0 (thiscall) | void | Iterates children calling update_bounds + advance | MEDIUM |
| 005F0342 | stub | FUN_005f0342 | ddctrl_deactivate_all | 0 (thiscall) | void | Iterates children calling deactivate + advance | MEDIUM |
| 005F0391 | medium | FUN_005f0391 | ddctrl_dispatch_message | 3(msg,wparam,lparam) | int | Dispatches WM to children; tracks hover [0xcc]; msg 0x200=mousemove | MEDIUM |
| 005F04C0 | stub | FUN_005f04c0 | ddctrl_list_clear_seh | 0 | void | SEH-wrapped call to list_clear_all + epilog | LOW |
| 005F04FE | stub | FUN_005f04fe | ddctrl_list_clear_all_thunk | 0 | void | Thunk to 005f0724 (list_clear_all) | LOW |
| 005F0511 | stub | FUN_005f0511 | ddctrl_seh_epilog | 0 | void | SEH frame teardown | LOW |
| 005F0520 | stub | FUN_005f0520 | ddctrl_list_init_seh | 0 | int | SEH-wrapped list initialization | LOW |
| 005F0590 | stub | FUN_005f0590 | ddctrl_list_get_first | 0 (thiscall) | int | Thunk to list_move_to_head (005f0770) | LOW |
| 005F05B0 | stub | FUN_005f05b0 | ddctrl_list_move_to_tail | 0 (thiscall) | int | Thunk to 005f07b3 | LOW |
| 005F05D0 | stub | FUN_005f05d0 | ddctrl_list_advance | 0 (thiscall) | int | Thunk to list_next (005f0833) | LOW |
| 005F05F0 | stub | FUN_005f05f0 | ddctrl_list_append | 1 | void | Thunk to list_push_back (005f08fb) | LOW |
| 005F0620 | stub | ios::lockptr | FRAMEWORK | thiscall | CRT_CS* | ios stream lock pointer accessor | HIGH |
| 005F0640 | stub | FUN_005f0640 | ddctrl_listnode_init | 0 (thiscall) | ptr | Zero-initializes 3-field node {data, next, prev} | MEDIUM |
| 005F0676 | stub | ~CDataBoundProperty | FRAMEWORK | thiscall | void | MFC data-bound property destructor (empty) | HIGH |
| 005F068C | stub | FUN_005f068c | ddctrl_listnode_set_next | 1 | void | Sets node field +4 (next pointer) | LOW |
| 005F06AD | stub | FUN_005f06ad | ddctrl_listnode_set_prev | 1 | void | Sets node field +8 (prev pointer) | LOW |
| 005F06CE | stub | FUN_005f06ce | ddctrl_listnode_set_data | 1 | void | Sets node field +0 (data value) | LOW |
| 005F06EE | stub | FUN_005f06ee | ddctrl_listnode_init2 | 0 (thiscall) | ptr | Identical to 005f0640, zero-init 3 fields | LOW |
| 005F0724 | stub | FUN_005f0724 | ddctrl_list_destroy_all | 0 | void | Thunk to 005f0e13 (iterate+remove all) | LOW |
| 005F0742 | stub | FUN_005f0742 | ddctrl_list_is_empty | 0 (thiscall) | bool | Returns *this == 0 (head is null) | MEDIUM |
| 005F0770 | stub | FUN_005f0770 | ddctrl_list_begin | 0 (thiscall) | int | Sets cursor to head, returns data | MEDIUM |
| 005F07B3 | stub | FUN_005f07b3 | ddctrl_list_rbegin | 0 (thiscall) | int | Sets cursor to tail, returns data | MEDIUM |
| 005F07F9 | stub | pDNameNode::length | FRAMEWORK | thiscall | int | Name demangler node length | HIGH |
| 005F0833 | stub | FUN_005f0833 | ddctrl_list_next | 0 (thiscall) | int | Advances cursor via get_prev, returns data | MEDIUM |
| 005F0897 | stub | FUN_005f0897 | ddctrl_list_prev | 0 (thiscall) | int | Advances cursor via get_next, returns data | MEDIUM |
| 005F08FB | medium | FUN_005f08fb | ddctrl_list_push_back | 1 | void | Allocates 12-byte node, links at tail of doubly-linked list | MEDIUM |
| 005F0A04 | medium | FUN_005f0a04 | ddctrl_list_insert_before | 1 | void | Inserts node before cursor in linked list | MEDIUM |
| 005F0BCE | stub | FUN_005f0bce | ddctrl_list_find | 1(int) | int | Linear search for matching data value | MEDIUM |
| 005F0C21 | stub | FUN_005f0c21 | ddctrl_list_count | 0 (thiscall) | int | Counts nodes by iterating head to end | MEDIUM |
| 005F0C69 | medium | FUN_005f0c69 | ddctrl_list_remove_current | 0 (thiscall) | void | Unlinks current node, frees via scalar_deleting_destructor | MEDIUM |
| 005F0E13 | stub | FUN_005f0e13 | ddctrl_list_clear | 0 (thiscall) | void | Removes all nodes from head to empty | MEDIUM |
| 005F0E50 | stub | FUN_005f0e50 | ddctrl_listnode_get_data | 0 (thiscall) | int | Returns field +0 (data) | LOW |
| 005F0E70 | stub | FUN_005f0e70 | ddctrl_listnode_get_next | 0 (thiscall) | int | Returns field +4 (next) | LOW |
| 005F0E90 | stub | FUN_005f0e90 | ddctrl_listnode_get_prev | 0 (thiscall) | int | Returns field +8 (prev) | LOW |
| 005F0EB0 | stub | scalar_deleting_destructor | FRAMEWORK | thiscall | void* | CDataBoundProperty scalar deleting destructor | HIGH |
| 005F0EF0 | stub | FUN_005f0ef0 | ddctrl_get_current_control | 0 | int | Returns global DAT_00639dc8 (current active control) | MEDIUM |
| 005F0F05 | stub | FUN_005f0f05 | ddctrl_set_current_control | 1 | void | Sets global DAT_00639dc8 | MEDIUM |
| 005F0F1D | medium | FUN_005f0f1d | ddctrl_construct | 0 (thiscall) | ptr | Constructor: sets vtable PTR_FUN_0061d720, zero-inits all fields | MEDIUM |
| 005F0FE9 | medium | FUN_005f0fe9 | ddctrl_construct_with_parent | 1 | ptr | Constructor with parent window param at field [2] | MEDIUM |
| 005F10B6 | medium | FUN_005f10b6 | ddctrl_construct_with_control | 1 | ptr | Constructor with parent control param at field [3] | MEDIUM |
| 005F1183 | stub | FUN_005f1183 | ddctrl_destructor | 0 (thiscall) | void | Destructor: clears children list, calls base cleanup | MEDIUM |
| 005F11D2 | stub | FUN_005f11d2 | ddctrl_base_destructor | 0 | void | Thunk to list SEH cleanup | LOW |
| 005F11E8 | stub | FUN_005f11e8 | ddctrl_seh_epilog2 | 0 | void | SEH frame teardown | LOW |
| 005F11F6 | stub | FUN_005f11f6 | ddctrl_set_enabled | 1 | void | Sets field +8=param, clears field +0xc | MEDIUM |
| 005F1221 | stub | CTestCmdUI::Enable | FRAMEWORK | thiscall,1 | void | MFC test command UI enable | HIGH |
| 005F124C | medium | FUN_005f124c | ddctrl_init | 2(hwnd,rect*) | void | Initializes control: sets parent, bounds rect, resolves parent window, registers in child list | HIGH |
| 005F130F | large | FUN_005f130f | ddctrl_handle_message | 3(msg,x,y) | int | Central message dispatcher: WM_LBUTTONDOWN(0x201), WM_RBUTTONDOWN(0x204), WM_MOUSEMOVE(0x200), WM_DBLCLK(0x203), etc. via vtable | HIGH |
| 005F1514 | stub | FUN_005f1514 | ddctrl_get_parent_window | 0 (thiscall) | int | Resolves parent window handle, caches at field +8 | MEDIUM |
| 005F156D | stub | FUN_005f156d | ddctrl_check_tracking | 0 (thiscall) | void | Gets parent window, calls CSplitterWnd::IsTracking | MEDIUM |
| 005F15A9 | stub | FUN_005f15a9 | ddctrl_assert_parent | 0 (thiscall) | void | Asserts GetParentGameWin() != null (ddcntrl.cpp:0xd8) | HIGH |
| 005F15F2 | stub | FUN_005f15f2 | ddctrl_update_bounds | 0 (thiscall) | void | Calls vtable[0x28](bounds), then update_bounds_all | MEDIUM |
| 005F1622 | stub | FUN_005f1622 | ddctrl_activate | 0 (thiscall) | void | Sets active flag [0xd]=1, calls vtable[0x20](1), initializes children | MEDIUM |
| 005F1683 | stub | FUN_005f1683 | ddctrl_deactivate | 0 (thiscall) | void | Clears active flag [0xd]=0, calls vtable[0x20](0), deactivates children | MEDIUM |
| 005F16C4 | stub | FUN_005f16c4 | ddctrl_set_activate_callback | 1 | void | Sets callback pointer at field +0x20 | LOW |
| 005F16E5 | stub | FUN_005f16e5 | ddctrl_set_rbuttonup_callback | 1 | void | Sets callback pointer at field +0x24 | LOW |
| 005F1706 | stub | FUN_005f1706 | ddctrl_set_paint_callback | 1 | void | Sets callback pointer at field +0x28 | LOW |
| 005F1727 | stub | FUN_005f1727 | ddctrl_set_keydown_callback | 1 | void | Sets callback pointer at field +0x2c | LOW |
| 005F1748 | stub | FUN_005f1748 | ddctrl_set_dblclick_callback | 1 | void | Sets callback pointer at field +0x30 | LOW |
| 005F1769 | stub | FUN_005f1769 | ddctrl_fire_activate | 0 (thiscall) | void | Calls activate callback with field +4 (hwnd) | LOW |
| 005F179C | stub | FUN_005f179c | ddctrl_activate_thunk | 0 | void | Thunk to ddctrl_activate | LOW |
| 005F17BC | stub | FUN_005f17bc | ddctrl_noop_lbuttondown | 0 | void | Empty stub (default LButtonDown handler) | LOW |
| 005F17D4 | stub | FUN_005f17d4 | ddctrl_fire_keydown | 2 | void | Calls keydown callback at +0x28 | LOW |
| 005F1811 | stub | FUN_005f1811 | ddctrl_fire_keychar | 2 | void | Calls callback at +0x2c | LOW |
| 005F184E | stub | FUN_005f184e | ddctrl_fire_rbuttonup | 2 | void | Calls callback at +0x24 | LOW |
| 005F188B | stub | FUN_005f188b | ddctrl_fire_dblclick | 2 | void | Calls callback at +0x30 | LOW |
| 005F18C8 | stub | FUN_005f18c8 | ddctrl_noop_lbuttonup | 0 | void | Empty stub (default LButtonUp handler) | LOW |
| 005F18E0 | stub | FUN_005f18e0 | ddctrl_noop_rbuttondown | 0 | void | Empty stub (default RButtonDown handler) | LOW |
| 005F18F8 | stub | FUN_005f18f8 | ddctrl_noop_rbuttonup | 0 | void | Empty stub (default RButtonUp handler) | LOW |
| 005F1910 | stub | FUN_005f1910 | ddctrl_noop_mousemove | 0 | void | Empty stub (default MouseMove handler) | LOW |
| 005F1928 | stub | FUN_005f1928 | ddctrl_register_child | 1 | void | Adds control to parent's child list | MEDIUM |
| 005F195A | stub | FUN_005f195a | ddctrl_clear_children | 0 (thiscall) | void | Removes all children from list | MEDIUM |
| 005F19A6 | stub | FUN_005f19a6 | ddctrl_deactivate_children | 0 (thiscall) | void | Iterates children calling deactivate | MEDIUM |
| 005F19EF | stub | FUN_005f19ef | ddctrl_update_bounds_children | 0 (thiscall) | void | Iterates children calling update_bounds | MEDIUM |
| 005F1A40 | medium | FUN_005f1a40 | ddctrl_dispatch_to_children | 3(msg,x,y) | int | Dispatches message to child controls; tracks hover at field +0x1c | MEDIUM |
| 005F1B50 | stub | CSplitterWnd::IsTracking | FRAMEWORK | thiscall | int | MFC splitter window tracking check | HIGH |

---

### Cluster: CRT Process Startup / Exit

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F1B80 | medium | __onexit | FRAMEWORK | 1 | ptr | Register atexit-like callback | HIGH |
| 005F1C40 | stub | _atexit | FRAMEWORK | 1 | int | Standard atexit wrapper | HIGH |
| 005F1C70 | stub | ___onexitinit | FRAMEWORK | 0 | int | Initialize onexit table | HIGH |
| 005F1CC8 | stub | __global_unwind2 | FRAMEWORK | 1 | void | SEH global unwind | HIGH |
| 005F1D0A | medium | __local_unwind2 | FRAMEWORK | 2 | void | SEH local unwind | HIGH |
| 005F1D72 | stub | __abnormal_termination | FRAMEWORK | 0 | int | Check abnormal termination flag | HIGH |
| 005F1D95 | stub | FUN_005f1d95 | crt_save_context_1 | 0 | void | Saves ECX/EAX/EBP to globals (SEH helper) | LOW |
| 005F1D9E | stub | FUN_005f1d9e | crt_save_context_2 | 0 | void | Similar SEH context save | LOW |
| 005F4160 | stub | __cinit | FRAMEWORK | 0 | void | CRT C initialization | HIGH |
| 005F41B0 | stub | _exit | FRAMEWORK | 1 | noreturn | Process exit | HIGH |
| 005F41D0 | stub | __exit | FRAMEWORK | 1 | noreturn | Internal process exit | HIGH |
| 005F41F0 | stub | __cexit | FRAMEWORK | 0 | void | CRT cleanup exit | HIGH |
| 005F4210 | stub | __c_exit | FRAMEWORK | 0 | void | CRT quick exit | HIGH |
| 005F4230 | medium | doexit | FRAMEWORK | 3 | void | Core exit handler | HIGH |
| 005F4330 | stub | __initterm | FRAMEWORK | 2 | void | Call function pointer table | HIGH |
| 005F6E90 | large | entry | FRAMEWORK | 0 | noreturn | CRT entry point (calls WinMain via thunk_FUN_0055add0) | HIGH |
| 005F70E0 | stub | __amsg_exit | FRAMEWORK | 1 | noreturn | CRT fatal message exit | HIGH |
| 005F7120 | stub | FUN_005f7120 | crt_stub_return | 0 | void | Stub (returns immediately) | LOW |
| 005FFFE0 | stub | __FF_MSGBANNER | FRAMEWORK | 0 | void | CRT error message banner | HIGH |

---

### Cluster: C++ Exception Handling

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F1DC0 | stub | _JumpToContinuation | FRAMEWORK | 2 | void | EH jump to continuation | HIGH |
| 005F1E00 | stub | _CallMemberFunction0 | FRAMEWORK | 2 | void | EH call member function (0 args) | HIGH |
| 005F1E10 | stub | FID:_CallMemberFunction1 | FRAMEWORK | 2 | void | EH call member function (1 arg) variant A | HIGH |
| 005F1E20 | stub | FID:_CallMemberFunction1 | FRAMEWORK | 2 | void | EH call member function (1 arg) variant B | HIGH |
| 005F1E30 | stub | _UnwindNestedFrames | FRAMEWORK | 4 | void | EH nested frame unwind | HIGH |
| 005F1E90 | stub | ___CxxFrameHandler | FRAMEWORK | 4 | int | C++ frame-based exception handler | HIGH |
| 005F1ED0 | stub | ___CxxLongjmpUnwind@4 | FRAMEWORK | 1 | void | C++ longjmp unwind | HIGH |
| 005F1F10 | medium | _CallCatchBlock2 | FRAMEWORK | 5 | void | EH catch block invocation | HIGH |
| 005F1F80 | small | CatchGuardHandler | FRAMEWORK | 4 | int | EH catch guard | HIGH |
| 005F1FC0 | medium | _CallSETranslator | FRAMEWORK | 7 | void | SEH-to-C++ exception translation | HIGH |
| 005F20A0 | small | TranslatorGuardHandler | FRAMEWORK | 4 | int | SEH translator guard | HIGH |
| 005F79A0 | medium | ___InternalCxxFrameHandler | FRAMEWORK | 8 | void | Internal C++ EH frame handler | HIGH |
| 005F7AC0 | large | FindHandler | FRAMEWORK | 8 | void | Find matching EH handler | HIGH |
| 005F7D70 | medium | FindHandlerForForeignException | FRAMEWORK | 8 | void | Handle foreign (non-C++) exceptions | HIGH |
| 005F7E90 | medium | GetRangeOfTrysToCheck | FRAMEWORK | 5 | ptr | Get try block range for state | HIGH |
| 005F7F80 | medium | TypeMatch | FRAMEWORK | 3 | int | RTTI type matching for catch | HIGH |
| 005F8050 | medium | ___FrameUnwindToState | FRAMEWORK | 4 | void | Unwind to specific EH state | HIGH |
| 005F8160 | stub | FID:ArrayUnwindFilter | FRAMEWORK | 1 | int | Array unwind exception filter (variant 2) | HIGH |
| 005F81B0 | medium | CatchIt | FRAMEWORK | 10 | void | Execute catch block | HIGH |
| 005F8290 | medium | CallCatchBlock | FRAMEWORK | 6 | int | Call catch handler function | HIGH |
| 005F83F0 | stub | ExFilterRethrow | FRAMEWORK | 1 | int | Exception filter for rethrow | HIGH |
| 005F8460 | large | BuildCatchObject | FRAMEWORK | 4 | void | Build catch object from thrown object | HIGH |
| 005F8740 | medium | DestructExceptionObject | FRAMEWORK | 2 | void | Destroy thrown exception object | HIGH |
| 005F87E0 | stub | AdjustPointer | FRAMEWORK | 2 | ptr | Adjust pointer for MI/vbase | HIGH |
| 005F8830 | stub | __CallSettingFrame@12 | FRAMEWORK | 3 | int | Call with EH frame setup | HIGH |
| 005F8880 | medium | terminate | FRAMEWORK | 0 | noreturn | C++ terminate handler | HIGH |
| 005F8920 | stub | unexpected | FRAMEWORK | 0 | noreturn | C++ unexpected handler | HIGH |
| 005F8950 | medium | _inconsistency | FRAMEWORK | 0 | noreturn | C++ inconsistency handler | HIGH |

---

### Cluster: CRT Memory Management (malloc/free/debug heap)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F2110 | medium | FID:_memcpy | FRAMEWORK | 3 | ptr | Memory copy (optimized, variant 1) | HIGH |
| 005F2260 | stub | FUN_005f2260 | _srand | 1 | void | Set random seed (DAT_00639e50) | HIGH |
| 005F2280 | stub | _rand | FRAMEWORK | 0 | int | Generate pseudo-random number | HIGH |
| 005F22D0 | stub | FUN_005f22d0 | _strcpy | 2 | ptr | String copy (optimized DWORD-at-a-time) | HIGH |
| 005F22E0 | medium | FUN_005f22e0 | _strcat | 2 | ptr | String concatenate (optimized) | HIGH |
| 005F23C0 | medium | operator_delete | FRAMEWORK | 1 | void | C++ operator delete (debug) | HIGH |
| 005F2470 | stub | operator_new | FRAMEWORK | 1 | ptr | C++ operator new | HIGH |
| 005F2490 | medium | eh_vector_destructor_iterator | FRAMEWORK | 4 | void | Destroy array elements | HIGH |
| 005F2540 | medium | __ArrayUnwind | FRAMEWORK | 4 | void | Unwind array construction | HIGH |
| 005F25D0 | stub | FID:ArrayUnwindFilter | FRAMEWORK | 1 | int | Array unwind exception filter | HIGH |
| 005F2620 | medium | eh_vector_constructor_iterator | FRAMEWORK | 4 | void | Construct array elements | HIGH |
| 005F26E0 | stub | FUN_005f26e0 | crt_init_check | 0 | void | Stub, returns immediately | LOW |
| 005F43F0 | stub | _malloc | FRAMEWORK | 1 | ptr | Standard malloc | HIGH |
| 005F4420 | stub | __malloc_dbg | FRAMEWORK | 2+ | ptr | Debug malloc | HIGH |
| 005F4450 | stub | __nh_malloc | FRAMEWORK | 2 | ptr | No-throw malloc | HIGH |
| 005F4480 | medium | __nh_malloc_dbg | FRAMEWORK | 4 | ptr | Debug no-throw malloc | HIGH |
| 005F44F0 | stub | __heap_alloc | FRAMEWORK | 1 | ptr | Raw heap alloc | HIGH |
| 005F4520 | xlarge | __heap_alloc_dbg | FRAMEWORK | 5 | ptr | Debug heap alloc with header/guards | HIGH |
| 005F4860 | stub | _calloc | FRAMEWORK | 2 | ptr | Standard calloc | HIGH |
| 005F4890 | medium | __calloc_dbg | FRAMEWORK | 4 | ptr | Debug calloc | HIGH |
| 005F4900 | stub | FID:__expand | FRAMEWORK | 2 | ptr | Expand allocation (variant 1) | HIGH |
| 005F4930 | stub | __realloc_dbg | FRAMEWORK | 4+ | ptr | Debug realloc | HIGH |
| 005F4970 | xlarge | realloc_help | FRAMEWORK | 7 | ptr | Core realloc implementation | HIGH |
| 005F4F00 | stub | FID:__expand | FRAMEWORK | 2 | ptr | Expand allocation (variant 2) | HIGH |
| 005F4F30 | stub | __expand_dbg | FRAMEWORK | 4 | ptr | Debug expand | HIGH |
| 005F4F70 | stub | FUN_005f4f70 | crt_heap_stub | 0 | void | Returns immediately | LOW |
| 005F4F90 | xlarge | __free_dbg | FRAMEWORK | 2 | void | Debug free with leak/corruption checks | HIGH |
| 005F53C0 | stub | __msize | FRAMEWORK | 1 | uint | Get allocation size | HIGH |
| 005F53E0 | medium | __msize_dbg | FRAMEWORK | 2 | uint | Debug get allocation size | HIGH |
| 005F5550 | stub | FUN_005f5550 | crt_heap_validate_stub | 0 | void | Returns immediately | LOW |
| 005F5580 | small | __CrtSetDbgBlockType | FRAMEWORK | 2 | void | Set debug block type | HIGH |
| 005F5620 | stub | FUN_005f5620 | crt_heap_check_stub | 0 | void | Returns immediately | LOW |
| 005F5650 | small | _CheckBytes | FRAMEWORK | 3 | int | Verify guard bytes | HIGH |
| 005F56E0 | xlarge | __CrtCheckMemory | FRAMEWORK | 0 | int | Full heap validation | HIGH |
| 005F5A60 | stub | __CrtSetDbgFlag | FRAMEWORK | 1 | int | Set debug heap flags | HIGH |
| 005F5A90 | medium | __CrtDoForAllClientObjects | FRAMEWORK | 2 | void | Iterate client allocations | HIGH |
| 005F5B00 | stub | __CrtIsValidPointer | FRAMEWORK | 3 | int | Validate pointer | HIGH |
| 005F5B60 | medium | __CrtIsValidHeapPointer | FRAMEWORK | 1 | int | Validate heap pointer | HIGH |
| 005F5C30 | medium | __CrtIsMemoryBlock | FRAMEWORK | 5 | int | Check if valid memory block | HIGH |
| 005F5D30 | stub | FUN_005f5d30 | crt_alloc_counter_stub | 0 | void | Returns immediately | LOW |
| 005F5D60 | large | __CrtMemCheckpoint | FRAMEWORK | 1 | void | Checkpoint heap state | HIGH |
| 005F5EA0 | large | __CrtMemDifference | FRAMEWORK | 3 | int | Diff two heap checkpoints | HIGH |
| 005F5FE0 | xlarge | __CrtMemDumpAllObjectsSince | FRAMEWORK | 1 | void | Dump allocations since checkpoint | HIGH |
| 005F62A0 | medium | __printMemBlockData | FRAMEWORK | 1 | void | Print memory block details | HIGH |
| 005F63A0 | medium | __CrtDumpMemoryLeaks | FRAMEWORK | 0 | int | Report memory leaks | HIGH |
| 005F6430 | medium | __CrtMemDumpStatistics | FRAMEWORK | 1 | void | Print memory statistics | HIGH |
| 005F6500 | medium | FID:_memcpy | FRAMEWORK | 3 | ptr | Memory copy (variant 2) | HIGH |
| 005FC7B0 | stub | __malloc_base | FRAMEWORK | 1 | ptr | Base malloc (non-debug) | HIGH |
| 005FC7E0 | medium | __nh_malloc_base | FRAMEWORK | 2 | ptr | Base no-throw malloc | HIGH |
| 005FC880 | medium | __heap_alloc_base | FRAMEWORK | 1 | ptr | Base heap alloc | HIGH |
| 005FC8F0 | stub | FUN_005fc8f0 | crt_heap_base_stub | 0 | void | Returns immediately | LOW |
| 005FC910 | medium | __expand_base | FRAMEWORK | 2 | ptr | Base expand | HIGH |
| 005FC9E0 | large | __realloc_base | FRAMEWORK | 2 | ptr | Base realloc | HIGH |
| 005FCBF0 | medium | __free_base | FRAMEWORK | 1 | void | Base free | HIGH |
| 005FCC60 | medium | __heapchk | FRAMEWORK | 0 | int | Heap consistency check | HIGH |
| 005FCCE0 | stub | __heapset | FRAMEWORK | 1 | int | Set free heap bytes | HIGH |
| 005FCD00 | medium | __heap_init | FRAMEWORK | 0 | int | Initialize CRT heap | HIGH |
| 005FCD60 | medium | __heap_term | FRAMEWORK | 0 | void | Terminate CRT heap | HIGH |
| 005FCDC0 | stub | FUN_005fcdc0 | crt_heap_term_stub | 0 | void | Returns immediately | LOW |
| 005FCDE0 | stub | __set_sbh_threshold | FRAMEWORK | 1 | int | Set small-block heap threshold | HIGH |
| 005FCE30 | large | ___sbh_new_region | FRAMEWORK | 0 | int | Allocate SBH region | HIGH |
| 005FD040 | medium | ___sbh_release_region | FRAMEWORK | 1 | void | Release SBH region | HIGH |
| 005FD0D0 | large | ___sbh_decommit_pages | FRAMEWORK | 1 | void | Decommit SBH pages | HIGH |
| 005FD250 | medium | ___sbh_find_block | FRAMEWORK | 1 | int | Find SBH block | HIGH |
| 005FD300 | medium | ___sbh_free_block | FRAMEWORK | 2 | void | Free SBH block | HIGH |
| 005FD390 | xlarge | ___sbh_alloc_block | FRAMEWORK | 1 | int | Allocate SBH block | HIGH |
| 005FD860 | large | ___sbh_alloc_block_from_page | FRAMEWORK | 3 | int | SBH page-level allocator | HIGH |
| 005FDB60 | large | ___sbh_resize_block | FRAMEWORK | 3 | int | Resize SBH block | HIGH |
| 005FDD20 | large | ___sbh_heap_check | FRAMEWORK | 0 | int | SBH heap validation | HIGH |

---

### Cluster: CRT String Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F2700 | large | FID:__toupper_lk | FRAMEWORK | 1 | int | Locale-aware toupper | HIGH |
| 005F2840 | stub | _isalpha | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2890 | stub | _isupper | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F28E0 | stub | _islower | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2930 | stub | _isdigit | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2980 | stub | _isxdigit | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F29D0 | stub | _isspace | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2A20 | stub | _ispunct | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2A70 | stub | _isalnum | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2AC0 | stub | _isprint | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2B10 | stub | _isgraph | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2B60 | stub | _iscntrl | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2BB0 | stub | ___isascii | FRAMEWORK | 1 | int | Character classification | HIGH |
| 005F2BE0 | stub | FUN_005f2be0 | _toascii | 1 | int | Convert to ASCII (mask 0x7f) | MEDIUM |
| 005F2C00 | medium | ___iscsymf | FRAMEWORK | 1 | int | Check C symbol first char | HIGH |
| 005F2C80 | medium | ___iscsym | FRAMEWORK | 1 | int | Check C symbol char | HIGH |
| 005F2F30 | medium | _strncpy | FRAMEWORK | 3 | ptr | String copy with length | HIGH |
| 005F3030 | medium | _sprintf | FRAMEWORK | 2+ | int | Formatted string output | HIGH |
| 005F3120 | medium | _atol | FRAMEWORK | 1 | long | String to long | HIGH |
| 005F3240 | stub | _atoi | FRAMEWORK | 1 | int | String to int | HIGH |
| 005F3260 | large | __atoi64 | FRAMEWORK | 1 | int64 | String to 64-bit int | HIGH |
| 005F3480 | medium | _strlen | FRAMEWORK | 1 | uint | String length | HIGH |
| 005F3500 | medium | _memset | FRAMEWORK | 3 | ptr | Memory fill | HIGH |
| 005F3560 | medium | _strcmp | FRAMEWORK | 2 | int | String compare | HIGH |
| 005F35F0 | stub | FUN_005f35f0 | _strcpy_thunk | 2 | ptr | Thunk to _strcpy at 005f22d0 | HIGH |
| 005F3630 | medium | _strchr | FRAMEWORK | 2 | ptr | Find char in string | HIGH |
| 005F36F0 | stub | _strncmp | FRAMEWORK | 3 | int | Compare n chars | HIGH |
| 005F4370 | medium | _strstr | FRAMEWORK | 2 | ptr | Find substring | HIGH |
| 005F6D50 | medium | _memcmp | FRAMEWORK | 3 | int | Memory compare | HIGH |
| 005F6E00 | medium | __strcmpi | FRAMEWORK | 2 | int | Case-insensitive compare | HIGH |
| 005F74B0 | medium | _strncat | FRAMEWORK | 3 | ptr | Concatenate n chars | HIGH |
| 005F40B0 | medium | __strnicmp | FRAMEWORK | 3 | int | Case-insensitive compare n chars | HIGH |
| 005FC5E0 | large | _tolower | FRAMEWORK | 1 | int | Locale-aware tolower | HIGH |

---

### Cluster: CRT File I/O

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F2D00 | medium | __fsopen | FRAMEWORK | 3 | FILE* | Open file with sharing | HIGH |
| 005F2E10 | stub | _fopen | FRAMEWORK | 2 | FILE* | Open file | HIGH |
| 005F2E40 | medium | _fclose | FRAMEWORK | 1 | int | Close file | HIGH |
| 005F33B0 | medium | _fputs | FRAMEWORK | 2 | int | Write string to stream | HIGH |
| 005F3730 | large | _fread | FRAMEWORK | 4 | uint | Read from stream | HIGH |
| 005F3900 | large | _fwrite | FRAMEWORK | 4 | uint | Write to stream | HIGH |
| 005F3B20 | small | __chdir | FRAMEWORK | 1 | int | Change directory | HIGH |
| 005F3C10 | stub | _strrchr | FRAMEWORK | 2 | ptr | Find last char in string | HIGH |
| 005F3C40 | large | _fgets | FRAMEWORK | 3 | ptr | Read line from stream | HIGH |
| 005F3D70 | large | __filbuf | FRAMEWORK | 1 | int | Fill file buffer | HIGH |
| 005F3F50 | medium | _fputc | FRAMEWORK | 2 | int | Write char to stream | HIGH |
| 005F3FF0 | stub | _putc | FRAMEWORK | 2 | int | Write char (macro) | HIGH |
| 005F4010 | medium | _fgetc | FRAMEWORK | 1 | int | Read char from stream | HIGH |
| 005F4090 | stub | _getc | FRAMEWORK | 1 | int | Read char (macro) | HIGH |
| 005F6650 | stub | FID:__wrename | FRAMEWORK | 2 | int | Rename file (wide) | HIGH |
| 005F66B0 | stub | FID:_remove | FRAMEWORK | 1 | int | Remove file | HIGH |
| 005F6710 | stub | FID:__unlink | FRAMEWORK | 1 | int | Delete file | HIGH |
| 005F6730 | medium | _rewind | FRAMEWORK | 1 | void | Rewind file stream | HIGH |
| 005F67F0 | large | _fseek | FRAMEWORK | 3 | int | Seek in file stream | HIGH |
| 005F6920 | large | _ftell | FRAMEWORK | 1 | long | Get file position | HIGH |
| 005F6BD0 | medium | _printf | FRAMEWORK | 1+ | int | Formatted console output | HIGH |
| 005F9B30 | xlarge | __openfile | FRAMEWORK | 4 | FILE* | Core file open | HIGH |
| 005F9EF0 | medium | __getstream | FRAMEWORK | 0 | FILE* | Get free stream slot | HIGH |
| 005FA010 | large | __close | FRAMEWORK | 1 | int | Close file descriptor | HIGH |
| 005FA120 | medium | __freebuf | FRAMEWORK | 1 | void | Free file buffer | HIGH |
| 005FA1B0 | medium | _fflush | FRAMEWORK | 1 | int | Flush file stream | HIGH |
| 005FA230 | medium | __flush | FRAMEWORK | 1 | int | Internal flush | HIGH |
| 005FA2F0 | stub | __flushall | FRAMEWORK | 0 | int | Flush all streams | HIGH |
| 005FA310 | medium | flsall | FRAMEWORK | 1 | int | Flush all (internal) | HIGH |
| 005FA410 | large | __flsbuf | FRAMEWORK | 2 | int | Flush buffer on write | HIGH |
| 005FA6B0 | xlarge | __output | FRAMEWORK | 3 | int | Core formatted output (3177 bytes, printf engine) | HIGH |
| 005FB440 | medium | write_char | FRAMEWORK | 3 | void | Output single char | HIGH |
| 005FB4C0 | small | write_multi_char | FRAMEWORK | 3 | void | Output repeated char | HIGH |
| 005FB510 | small | write_string | FRAMEWORK | 4 | void | Output string segment | HIGH |
| 005FB570 | stub | get_int_arg | FRAMEWORK | 1 | int | Get int from va_list | HIGH |
| 005FB590 | stub | get_int64_arg | FRAMEWORK | 1 | int64 | Get int64 from va_list | HIGH |
| 005FB5C0 | stub | get_short_arg | FRAMEWORK | 1 | short | Get short from va_list | HIGH |
| 005FB5E0 | stub | __allmul | FRAMEWORK | 4 | int64 | 64-bit multiply | HIGH |
| 005FB620 | large | __stbuf | FRAMEWORK | 1 | int | Set temp buffer for stdout | HIGH |
| 005FB770 | medium | __ftbuf | FRAMEWORK | 2 | void | Free temp buffer | HIGH |
| 005FB830 | xlarge | __read | FRAMEWORK | 3 | int | Low-level read (1156 bytes) | HIGH |
| 005FBCD0 | large | __write | FRAMEWORK | 3 | int | Low-level write | HIGH |
| 005FC160 | xlarge | __ioinit | FRAMEWORK | 0 | void | Initialize I/O subsystem | HIGH |
| 005FC490 | medium | __ioterm | FRAMEWORK | 0 | void | Terminate I/O subsystem | HIGH |
| 005FC500 | medium | __getbuf | FRAMEWORK | 1 | void | Allocate file buffer | HIGH |
| 005FE0B0 | large | ___initstdio | FRAMEWORK | 0 | void | Initialize stdio | HIGH |
| 005FE210 | stub | ___endstdio | FRAMEWORK | 0 | void | Shutdown stdio | HIGH |
| 005FDF90 | medium | __lseek | FRAMEWORK | 3 | long | Low-level seek | HIGH |

---

### Cluster: CRT Math / Float / Misc

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F6C60 | stub | __ftol | FRAMEWORK | 0 | long | Float to long conversion | HIGH |
| 005F6C90 | stub | __fpmath | FRAMEWORK | 0 | void | FP math init | HIGH |
| 005F6CC0 | stub | FUN_005f6cc0 | crt_fp_init_stub | 0 | void | Returns immediately (FP placeholder) | LOW |
| 005F6CD0 | small | __cfltcvt_init | FRAMEWORK | 0 | void | Init float conversion function pointers | HIGH |
| 005F6D20 | stub | FUN_005f6d20 | crt_fp_stub2 | 0 | void | Returns immediately | LOW |
| 005FE240 | stub | __setdefaultprecision | FRAMEWORK | 0 | void | Set FP default precision | HIGH |
| 005FE260 | medium | __ms_p5_test_fdiv | FRAMEWORK | 0 | int | Pentium FDIV bug test | HIGH |
| 005FE2C0 | medium | __ms_p5_mp_test_fdiv | FRAMEWORK | 0 | int | Pentium FDIV multi-precision test | HIGH |
| 005FE320 | medium | __forcdecpt | FRAMEWORK | 1 | void | Force decimal point in float string | HIGH |
| 005FE3E0 | medium | __cropzeros | FRAMEWORK | 1 | void | Remove trailing zeros | HIGH |
| 005FE4C0 | stub | __positive | FRAMEWORK | 1 | int | Check if float positive | HIGH |
| 005FE500 | medium | __fassign | FRAMEWORK | 3 | void | Assign float value | HIGH |
| 005FE560 | large | __cftoe | FRAMEWORK | 5 | ptr | Float to E-format string | HIGH |
| 005FE730 | large | __cftof | FRAMEWORK | 4 | ptr | Float to F-format string | HIGH |
| 005FE8C0 | medium | __cftog | FRAMEWORK | 5 | ptr | Float to G-format string | HIGH |
| 005FE9E0 | stub | __cftoe_g | FRAMEWORK | 5 | ptr | Float to E-format (G variant) | HIGH |
| 005FEA20 | stub | __cftof_g | FRAMEWORK | 4 | ptr | Float to F-format (G variant) | HIGH |
| 005FEA60 | medium | __cfltcvt | FRAMEWORK | 5 | void | Central float conversion dispatch | HIGH |
| 005FEAE0 | stub | __shift | FRAMEWORK | 2 | void | Shift mantissa | HIGH |

---

### Cluster: CRT Locale / MBCS / Environment

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005FBFD0 | medium | __dosmaperr | FRAMEWORK | 1 | void | Map DOS error to errno | HIGH |
| 005FC090 | medium | __mbctoupper | FRAMEWORK | 1 | uint | MBCS toupper | HIGH |
| 005FC5C0 | stub | FUN_005fc5c0 | crt_locale_stub | 0 | void | Returns immediately | LOW |
| 005FC720 | stub | FUN_005fc720 | crt_locale_stub2 | 0 | void | Returns immediately | LOW |
| 005FC750 | stub | FUN_005fc750 | crt_locale_stub3 | 0 | void | Returns immediately | LOW |
| 005FC770 | stub | __callnewh | FRAMEWORK | 1 | int | Call new handler | HIGH |
| 005F9370 | large | ___crtLCMapStringW | FRAMEWORK | 6 | int | Locale-aware string mapping (wide) | HIGH |
| 005F9670 | medium | wcsncnt | FRAMEWORK | 2 | int | Count wide chars | HIGH |
| 005F96E0 | large | ___crtLCMapStringA | FRAMEWORK | 6 | int | Locale-aware string mapping (ANSI) | HIGH |
| 005F9A00 | medium | _strncnt | FRAMEWORK | 2 | int | Count chars up to limit | HIGH |
| 005F9A70 | medium | __isctype | FRAMEWORK | 2 | int | Check character type | HIGH |
| 005F9355 | stub | FUN_005f9355 | crt_locale_init_stub | 0 | void | Returns immediately | LOW |
| 005FEDF0 | stub | __ismbbalnum | FRAMEWORK | 1 | int | MBCS isalnum | HIGH |
| 005FEE20 | stub | __ismbbalpha | FRAMEWORK | 1 | int | MBCS isalpha | HIGH |
| 005FEE50 | stub | __ismbbgraph | FRAMEWORK | 1 | int | MBCS isgraph | HIGH |
| 005FEE80 | stub | __ismbbprint | FRAMEWORK | 1 | int | MBCS isprint | HIGH |
| 005FEEB0 | stub | __ismbbpunct | FRAMEWORK | 1 | int | MBCS ispunct | HIGH |
| 005FEED0 | stub | __ismbblead | FRAMEWORK | 1 | int | MBCS lead byte check | HIGH |
| 005FEEF0 | stub | __ismbbtrail | FRAMEWORK | 1 | int | MBCS trail byte check | HIGH |
| 005FEF10 | stub | __ismbbkana | FRAMEWORK | 1 | int | MBCS kana check | HIGH |
| 005FED90 | stub | __ismbbkalnum | FRAMEWORK | 1 | int | MBCS Katakana alnum | HIGH |
| 005FEDB0 | stub | __ismbbkprint | FRAMEWORK | 1 | int | MBCS Katakana print | HIGH |
| 005FEDD0 | stub | __ismbbkpunct | FRAMEWORK | 1 | int | MBCS Katakana punct | HIGH |
| 005FEF60 | medium | x_ismbbtype | FRAMEWORK | 3 | int | Core MBCS type check | HIGH |
| 005FEFD0 | large | __setenvp | FRAMEWORK | 0 | void | Initialize environment | HIGH |
| 005FF110 | medium | __setargv | FRAMEWORK | 0 | void | Initialize argv | HIGH |
| 005FF1E0 | xlarge | parse_cmdline | FRAMEWORK | 4 | void | Parse command line (958 bytes) | HIGH |
| 005FF5A0 | large | ___crtGetEnvironmentStringsW | FRAMEWORK | 0 | ptr | Get env strings (wide) | HIGH |
| 005FF860 | large | ___crtGetEnvironmentStringsA | FRAMEWORK | 0 | ptr | Get env strings (ANSI) | HIGH |
| 005FFAC0 | xlarge | __setmbcp | FRAMEWORK | 1 | int | Set multibyte code page | HIGH |
| 005FFDF0 | medium | getSystemCP | FRAMEWORK | 1 | int | Get system code page | HIGH |
| 005FFE80 | medium | _CPtoLCID | FRAMEWORK | 1 | int | Code page to locale ID | HIGH |
| 005FFF20 | medium | setSBCS | FRAMEWORK | 0 | void | Set single-byte character set | HIGH |
| 005FFFA0 | stub | FUN_005fffa0 | crt_mbcp_stub | 0 | void | Returns immediately | LOW |
| 005FFFC0 | stub | ___initmbctable | FRAMEWORK | 0 | void | Initialize MBCS table | HIGH |

---

### Cluster: CRT Debug Reporting

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005F89F0 | stub | __CrtDbgBreak | FRAMEWORK | 0 | void | Debug break | HIGH |
| 005F8A10 | medium | __CrtSetReportMode | FRAMEWORK | 2 | int | Set debug report mode | HIGH |
| 005F8A90 | medium | __CrtSetReportFile | FRAMEWORK | 2 | HANDLE | Set debug report file | HIGH |
| 005F8B40 | stub | FUN_005f8b40 | crt_dbg_report_stub | 0 | void | Returns immediately | LOW |
| 005F8B70 | xlarge | __CrtDbgReport | FRAMEWORK | 5+ | int | Debug assertion/error report (998 bytes) | HIGH |
| 005F8F60 | xlarge | _CrtMessageWindow | FRAMEWORK | 4 | int | Debug message dialog (813 bytes) | HIGH |
| 005F75E0 | xlarge | __assert | FRAMEWORK | 3 | noreturn | Assert failure handler (951 bytes) | HIGH |

---

### Cluster: CRT Exception Filter / Misc

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005FEB20 | large | __XcptFilter | FRAMEWORK | 2 | int | CRT exception filter | HIGH |
| 005FED20 | medium | xcptlookup | FRAMEWORK | 2 | ptr | Exception code lookup | HIGH |
| 005F7140 | stub | __getcwd | FRAMEWORK | 2 | ptr | Get current working directory | HIGH |
| 005F7170 | large | __getdcwd | FRAMEWORK | 3 | ptr | Get CWD for drive | HIGH |
| 005F72B0 | medium | __validdrive | FRAMEWORK | 1 | int | Check if drive letter valid | HIGH |
| 005F7320 | large | _time | FRAMEWORK | 1 | time_t | Get current time | HIGH |

---

## SUMMARY

### 1. Function Breakdown

| Category | Count | Percentage |
|----------|-------|-----------|
| CRT Library (Ghidra-identified) | 246 | 71% |
| CRT Stubs (unlabeled but identifiable) | ~20 | 6% |
| Smeds32 DDControl framework | ~75 | 22% |
| C++ EH runtime | ~5 | 1% |
| **Total** | **346** | **100%** |
| Game-specific functions | **0** | **0%** |

**All 346 functions are FRAMEWORK code.** Zero game logic exists in this block.

### 2. Top 5 Most Important Non-CRT Functions

While no game logic exists, the **Smeds32 DDControl** cluster is architecturally significant as MicroProse's in-house DirectDraw UI control system:

1. **005F130F (ddctrl_handle_message)** - Central Windows message dispatcher using vtable for mouse/keyboard events. Processes WM_LBUTTONDOWN(0x201), WM_RBUTTONDOWN(0x204), WM_MOUSEMOVE(0x200), WM_DBLCLK(0x203), WM_KEYDOWN(0x100), WM_CHAR(0x102). Shows the game's UI event routing architecture.

2. **005F124C (ddctrl_init)** - Control initialization with parent resolution and child list registration. Assert string confirms source: `D:\Ss\Smeds32\ddcntrl.cpp` line 0x72.

3. **005F0391 (ddctrl_dispatch_message)** - Top-level message dispatch to child control list with mouse hover tracking (0xcc offset).

4. **005F1A40 (ddctrl_dispatch_to_children)** - Recursive child message dispatch with similar hover tracking at offset 0x1c.

5. **005F0F1D (ddctrl_construct)** - Constructor revealing vtable at PTR_FUN_0061d720 and the DDControl object layout (~14 dword fields).

### 3. New DAT_ Globals Identified

| Global | Proposed Name | Evidence | Confidence |
|--------|--------------|----------|------------|
| DAT_00639dc8 | ddctrl_current_active_control | Get/set pattern in 005f0ef0/005f0f05, used in ddctrl_handle_message | MEDIUM |
| DAT_00639e50 | crt_random_seed | Used by _srand (005f2260) and _rand (005f2280) with LCG formula | HIGH |
| DAT_006e6b68 | crt_onexit_table_base | atexit/onexit function table pointer | HIGH |
| DAT_006e6b54 | crt_onexit_table_end | End pointer for atexit table | HIGH |
| DAT_006e6b3c | crt_command_line_ptr | Set from GetCommandLineA() in entry() | HIGH |
| DAT_00639fc0 | crt_environment_strings | Set from __crtGetEnvironmentStringsA() in entry() | HIGH |
| DAT_00639f28 | crt_os_major_version | From GetVersion() in entry() | HIGH |
| DAT_00639f20 | crt_os_build_number | From GetVersion() >> 16 in entry() | HIGH |
| PTR_FUN_0061d720 | ddctrl_vtable | DDControl class vtable pointer, set in constructor | MEDIUM |

### 4. Source File Attribution

The string `s_D__Ss_Smeds32_ddcntrl_cpp_00639dcc` confirms the DDControl cluster originates from `D:\Ss\Smeds32\ddcntrl.cpp`, part of MicroProse's **Smeds32** game engine library. "Smeds" likely stands for "Sid Meier's Entertainment/Development System" or similar. This is the same engine framework used across multiple MicroProse titles from the late 1990s.

use super::*;
use std::io::Write;

impl RustGenerator {
    pub fn header<T: Write>(w: &mut PrettyWriter<T>) -> Result<(), Error> {
        w.write_lines(
            "
//
// This file was automatically generated by witx-codegen - Do not edit manually.
//",
        )?;
        w.write_lines(
            "
pub type WasiHandle = i32;
pub type Char8 = u8;
pub type Char32 = u32;
pub type WasiPtr<T> = *const T;
pub type WasiMutPtr<T> = *mut T;
pub type WasiStringBytesPtr = WasiMutPtr<Char8>;

#[repr(C)]
#[derive(Copy, Clone, Debug)]
pub struct WasiSlice<T> {
    ptr: WasiPtr<T>,
    len: usize,
}

#[repr(C)]
#[derive(Copy, Clone, Debug)]
pub struct WasiMutSlice<T> {
    ptr: WasiMutPtr<T>,
    len: usize,
}

impl<T> WasiSlice<T> {
    pub fn as_slice(&self) -> &[T] {
        unsafe { std::slice::from_raw_parts(self.ptr, self.len) }
    }

    pub fn from_slice(&self, slice: &[T]) -> Self {
        WasiSlice {
            ptr: slice.as_ptr() as _,
            len: slice.len(),
        }
    }
}

impl<T> WasiMutSlice<T> {
    pub fn as_slice(&self) -> &[T] {
        unsafe { std::slice::from_raw_parts(self.ptr, self.len) }
    }

    pub fn as_mut_slice(&self) -> &mut [T] {
        unsafe { std::slice::from_raw_parts_mut(self.ptr, self.len) }
    }

    pub fn from_slice(&self, slice: &[T]) -> Self {
        WasiMutSlice {
            ptr: slice.as_ptr() as _,
            len: slice.len(),
        }
    }

    pub fn from_mut_slice(&self, slice: &mut [T]) -> Self {
        WasiMutSlice {
            ptr: slice.as_mut_ptr(),
            len: slice.len(),
        }
    }
}

#[repr(C)]
#[derive(Copy, Clone, Debug)]
pub struct WasiString {
    ptr: WasiStringBytesPtr,
    len: usize,
}

impl<T: AsRef<str>> From<T> for WasiString {
    fn from(s: T) -> Self {
        let s = s.as_ref();
        WasiString {
            ptr: s.as_ptr() as _,
            len: s.len(),
        }
    }
}

impl WasiString {
    pub fn as_str(&self) -> Result<&str, std::str::Utf8Error> {
        std::str::from_utf8(unsafe { std::slice::from_raw_parts(self.ptr, self.len) })
    }

    pub fn as_mut_str(&mut self) -> Result<&mut str, std::str::Utf8Error> {
        std::str::from_utf8_mut(unsafe { std::slice::from_raw_parts_mut(self.ptr, self.len) })
    }

    pub fn as_slice(&self) -> &[u8] {
        unsafe { std::slice::from_raw_parts(self.ptr, self.len) }
    }

    pub fn as_mut_slice(&self) -> &mut [u8] {
        unsafe { std::slice::from_raw_parts_mut(self.ptr, self.len) }
    }

    pub fn from_slice(&self, slice: &[u8]) -> Self {
        WasiString {
            ptr: slice.as_ptr() as _,
            len: slice.len(),
        }
    }

    pub fn from_mut_slice(&self, slice: &mut [u8]) -> Self {
        WasiString {
            ptr: slice.as_mut_ptr(),
            len: slice.len(),
        }
    }
}
",
        )?;
        w.eob()?;
        Ok(())
    }
}
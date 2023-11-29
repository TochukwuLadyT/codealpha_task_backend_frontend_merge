package com.codealphatask.studentattendancemgtsystem.controller;

import com.codealphatask.studentattendancemgtsystem.model.Student;
import com.codealphatask.studentattendancemgtsystem.service.ImplStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/attendance")
public class StudentController {
    private final ImplStudentService studentService;
    @GetMapping
    public ResponseEntity<List<Student>> getStudents(){
        return new ResponseEntity<>(studentService.getStudents(), HttpStatus.FOUND);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }
    @PutMapping("/updateStudent/{id}")
    public Student updateStudent(@RequestBody Student student, @PathVariable Long id){
        return studentService.updateStudent(student, id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
    }

    @GetMapping("/getStudentProfileById/{id}")
    public Student getStudentProfileById(@PathVariable Long id){

        return studentService.getStudentProfileById(id);
    }

    @PutMapping("/updateAttendanceStatusPresent/{id}")
    public Student updateAttendanceStatusPresent(@RequestBody Student student, @PathVariable Long id){
        return studentService.updateAttendanceStatusPresent(student, id);

    }

    @PutMapping("/updateAttendanceStatusAbsent/{id}")
    public Student updateAttendanceStatusAbsent(@RequestBody Student student, @PathVariable Long id){
        return studentService.updateAttendanceStatusAbsent(student, id);

    }



}

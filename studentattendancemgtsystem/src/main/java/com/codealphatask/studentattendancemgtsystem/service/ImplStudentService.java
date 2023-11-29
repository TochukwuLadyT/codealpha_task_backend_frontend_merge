package com.codealphatask.studentattendancemgtsystem.service;

import com.codealphatask.studentattendancemgtsystem.model.Student;

import java.util.List;

public interface ImplStudentService {
    Student addStudent(Student student);

    List<Student> getStudents();

    Student updateStudent(Student student, Long id);

    Student getStudentProfileById(Long id);

    void deleteStudent(Long id);

    Student updateAttendanceStatusPresent(Student student, Long id);

    Student updateAttendanceStatusAbsent(Student student, Long id);
}

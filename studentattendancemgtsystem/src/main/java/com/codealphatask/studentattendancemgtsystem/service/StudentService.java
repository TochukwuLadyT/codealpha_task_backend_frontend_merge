package com.codealphatask.studentattendancemgtsystem.service;

import com.codealphatask.studentattendancemgtsystem.exception.StudentAlreadyExistsException;
import com.codealphatask.studentattendancemgtsystem.exception.StudentNotFoundException;
import com.codealphatask.studentattendancemgtsystem.model.Student;
import com.codealphatask.studentattendancemgtsystem.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService implements ImplStudentService{
    private final StudentRepository studentRepository;

    @Override
    public Student addStudent(Student student) {
        if (studentAlreadyExists(student.getEmail())){
            throw  new StudentAlreadyExistsException(student.getEmail()+ " already exists!");
        }
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }



    @Override
    public Student updateStudent(Student student, Long id) {
        return studentRepository.findById(id).map(st -> {
            st.setFirstName(student.getFirstName());
            st.setLastName(student.getLastName());
            st.setEmail(student.getEmail());
            st.setDepartment(student.getDepartment());
            return studentRepository.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    @Override
    public Student getStudentProfileById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Sorry, no student found with the Id :" +id));
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)){
            throw new StudentNotFoundException("Sorry, student not found");
        }
        studentRepository.deleteById(id);

    }

    @Override
    public Student updateAttendanceStatusPresent(Student student, Long id) {
        return studentRepository.findById(id).map(st -> {
            st.setAttendanceStatus("Present");
            return studentRepository.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    @Override
    public Student updateAttendanceStatusAbsent(Student student, Long id) {
        return studentRepository.findById(id).map(st -> {
            st.setAttendanceStatus("Absent");
            return studentRepository.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    private boolean studentAlreadyExists(String email) {

        return studentRepository.findByEmail(email).isPresent();
    }


}

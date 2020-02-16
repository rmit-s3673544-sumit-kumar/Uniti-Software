package com.hospital.service;

import java.text.SimpleDateFormat;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.hospital.entity.Round;

@Service
public class EmailService {
	@Autowired
	private TemplateEngine templateEngine;

	@Autowired
	private JavaMailSender javaMailSender;

	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	public boolean sendMail(Round round,String sub) {
		try {
			String to =round.getEmployee().getEmail(); ;
			String subject = sub + simpleDateFormat.format(round.getDate());
			// get and fill the template
			final Context context = new Context();
			context.setVariable("round", round);
			String body = templateEngine.process("email-template", context);
			return sendPreparedMail(to, subject, body, true);
		}catch(Exception e) {
			return false;
		}
	}

	private boolean sendPreparedMail(String to, String subject, String text, Boolean isHtml) {
		try {
			MimeMessage mail = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mail, true);
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(text, isHtml);
			javaMailSender.send(mail);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}

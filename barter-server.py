import webapp2

#sample2
class MainPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World! FROM GOOGLE APP ENGINE MOFOS!')


application = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)